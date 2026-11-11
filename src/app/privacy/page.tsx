import type { Metadata } from "next";
import { ContactImage } from "../_components/ContactImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | FH WEB DESIGN",
  description: "FH WEB DESIGN における個人情報の取り扱いについてご案内します。",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    heading: "1. 取得する情報",
    body: "お問い合わせフォームを通じて、お名前、メールアドレス、お問い合わせ内容をご入力いただきます。あわせて、不正利用の防止のため、送信元のIPアドレス等の通信情報が一時的に処理されます。",
  },
  {
    heading: "2. 利用目的",
    body: "取得した情報は、お問い合わせへの回答・ご連絡、および自動返信メールの送信、不正利用の防止のためにのみ利用します。それ以外の目的では利用しません。",
  },
  {
    heading: "3. 第三者への提供・委託",
    body: "法令に基づく場合を除き、ご本人の同意なく第三者に提供しません。ただし、サイトの配信およびメールの転送に Cloudflare, Inc.、メールの送信に Resend を利用しており、これらのサービス上でお問い合わせ内容が処理されます。",
  },
  {
    heading: "4. 安全管理",
    body: "取得した個人情報は、漏えい・滅失・毀損を防ぐため、アクセスできる者を限定するなど、適切に管理します。",
  },
  {
    heading: "5. 保管期間",
    body: "お問い合わせへの対応に必要な期間保管し、不要となった情報は速やかに削除します。",
  },
  {
    heading: "6. 開示・訂正・削除のご請求",
    body: "ご本人からの個人情報の開示、訂正、削除等のご請求には、ご本人確認のうえ、法令に従い対応します。下記のお問い合わせ先までご連絡ください。",
  },
  {
    heading: "7. 改定",
    body: "本ポリシーは、必要に応じて内容を見直し、改定することがあります。改定後の内容は、本ページに掲載した時点から効力を生じます。",
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-16 text-[#2F3437]">
      <main className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-wide">
          プライバシーポリシー
        </h1>
        <p className="mt-6 text-sm leading-loose text-[#2F3437]/80">
          FH WEB
          DESIGN（以下「当事務所」）は、お問い合わせ等でお預かりする個人情報を、以下の方針に基づき適切に取り扱います。
        </p>
        {SECTIONS.map(({ heading, body }) => (
          <section key={heading} className="mt-8">
            <h2 className="text-base font-semibold">{heading}</h2>
            <p className="mt-2 text-sm leading-loose text-[#2F3437]/80">
              {body}
            </p>
          </section>
        ))}
        <section className="mt-8">
          <h2 className="text-base font-semibold">お問い合わせ先</h2>
          <p className="mt-2 text-sm leading-loose text-[#2F3437]/80">
            FH WEB DESIGN（代表者：森　太）
            <br />
            〒448-0804 愛知県刈谷市半城土町北十三塚7-1 ソシア十三塚404
            <br />
            電話：<ContactImage kind="tel" />
            <br />
            <ContactImage kind="mail" />
          </p>
        </section>
        <p className="mt-12 text-xs text-[#2F3437]/60">
          制定日：2026年11月10日
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-[#3E7A52] underline underline-offset-4"
        >
          ← トップページへ戻る
        </Link>
      </main>
    </div>
  );
}
