"use server";

import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { HIRAGANA_ERROR, HIRAGANA_PATTERN } from "./contact-validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const MAX_LENGTH = { name: 100, email: 200, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Cloudflare の環境変数・シークレットを優先し、無ければ process.env（ローカル開発）を読む。 */
function getEnv(name: string): string | undefined {
  try {
    const value = (getCloudflareContext().env as Record<string, unknown>)[name];
    if (typeof value === "string" && value) return value;
  } catch {
    // Cloudflare 実行環境外（next dev など）
  }
  return process.env[name];
}

const FROM_DEFAULT = "FH WEB DESIGN <info@fh-web-design.com>";
const INBOX_DEFAULT = "info@fh-web-design.com";

type Mail = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
};

/** Resend でメールを1通送る。成功したら true。 */
async function sendMail(apiKey: string, mail: Mail): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mail),
  });
  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
  }
  return response.ok;
}

type Limiter = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

/** 同一IP・同一宛先メールアドレスからの連続送信を制限する。制限基盤が使えない環境では通す。 */
async function isRateLimited(email: string): Promise<boolean> {
  try {
    const env = getCloudflareContext().env as unknown as Record<
      string,
      Limiter | undefined
    >;
    const ip = (await headers()).get("cf-connecting-ip") ?? "unknown";
    const checks = [
      env.CONTACT_IP_LIMITER?.limit({ key: `ip:${ip}` }),
      env.CONTACT_MAIL_LIMITER?.limit({ key: `mail:${email.toLowerCase()}` }),
    ];
    const results = await Promise.all(checks);
    return results.some((r) => r && !r.success);
  } catch {
    return false; // Cloudflare 実行環境外（next dev など）
  }
}

const field = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

const fail = (message: string): ContactState => ({ status: "error", message });

/** お問い合わせを Resend 経由で事務所に通知し、送信者に自動返信する。 */
export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // ハニーポット：ボットだけが埋める隠し項目。成功を装って破棄する。
  if (field(formData, "website")) {
    return { status: "success", message: "送信しました。" };
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");

  if (!name || !email || !message) {
    return fail("お名前・メールアドレス・お問い合わせ内容をご入力ください。");
  }
  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    message.length > MAX_LENGTH.message
  ) {
    return fail("入力内容が長すぎます。");
  }
  if (!EMAIL_PATTERN.test(email)) {
    return fail("メールアドレスの形式をご確認ください。");
  }
  if (!HIRAGANA_PATTERN.test(message)) {
    return fail(HIRAGANA_ERROR);
  }

  if (await isRateLimited(email)) {
    return fail(
      "送信が集中しています。しばらく時間をおいて、再度お試しください。",
    );
  }

  const apiKey = getEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return fail(
      "現在フォームをご利用いただけません。info@fh-web-design.com まで直接ご連絡ください。",
    );
  }

  const from = getEnv("CONTACT_FROM") ?? FROM_DEFAULT;
  const inbox = getEnv("CONTACT_TO") ?? INBOX_DEFAULT;

  // 1) 事務所宛ての通知（これが失敗したら全体を失敗扱いにする）
  const notified = await sendMail(apiKey, {
    from,
    to: [inbox],
    reply_to: email,
    subject: `【お問い合わせ】${name} 様`,
    html: `<p><b>お名前:</b> ${escapeHtml(name)}</p><p><b>メール:</b> ${escapeHtml(email)}</p><p><b>内容:</b></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });
  if (!notified) {
    return fail("送信に失敗しました。時間をおいて再度お試しください。");
  }

  // 2) 入力されたアドレス宛ての自動返信（失敗しても受付自体は成功扱い）
  await sendMail(apiKey, {
    from,
    to: [email],
    reply_to: inbox,
    subject: "【FH WEB DESIGN】お問い合わせを受け付けました",
    html: `<p>${escapeHtml(name)} 様</p>
<p>この度はお問い合わせいただき、ありがとうございます。<br>以下の内容で受け付けいたしました。内容を確認のうえ、改めてご連絡いたします。</p>
<hr>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<hr>
<p style="font-size:12px;color:#666">※このメールは自動送信です。心当たりのない場合は、お手数ですが破棄してください。<br>FH WEB DESIGN / ${INBOX_DEFAULT}</p>`,
  });

  return {
    status: "success",
    message:
      "お問い合わせを受け付けました。内容を確認のうえ、ご連絡いたします。",
  };
}
