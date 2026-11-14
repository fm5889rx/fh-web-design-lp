"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { sendContact, type ContactState } from "./contact-action";
import { HIRAGANA_ERROR, HIRAGANA_PATTERN } from "./contact-validation";

const INITIAL_STATE: ContactState = { status: "idle", message: "" };

const INPUT_CLASS =
  "mt-2 w-full rounded-xl border border-[#A8DAB5] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3E7A52] focus:ring-2 focus:ring-[#A8DAB5]";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContact,
    INITIAL_STATE,
  );

  const [clientError, setClientError] = useState("");

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-2xl bg-white p-8 text-center text-sm leading-loose shadow-sm ring-1 ring-[#A8DAB5]"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        // ひらがなを含まない内容は送信前にブロックする（サーバー側でも再チェック）
        const message = new FormData(e.currentTarget).get("message");
        if (!HIRAGANA_PATTERN.test(String(message ?? ""))) {
          e.preventDefault();
          setClientError(HIRAGANA_ERROR);
        } else {
          setClientError("");
        }
      }}
      className="space-y-5 text-left">
      <label className="block text-sm font-medium">
        お名前
        <input
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className={INPUT_CLASS}
        />
      </label>
      <label className="block text-sm font-medium">
        メールアドレス
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={INPUT_CLASS}
        />
      </label>
      <label className="block text-sm font-medium">
        お問い合わせ内容
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={INPUT_CLASS}
        />
      </label>
      {/* ボット対策のハニーポット（人には見えない） */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <p className="text-xs leading-relaxed text-[#2F3437]/70">
        送信により、
        <Link
          href="/privacy"
          className="text-[#3E7A52] underline underline-offset-4"
        >
          プライバシーポリシー
        </Link>
        に同意したものとします。
      </p>
      <p aria-live="polite" className="min-h-5 text-sm text-red-700">
        {clientError || (state.status === "error" ? state.message : "")}
      </p>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-[#3E7A52] to-[#5FAE7A] px-8 py-3.5 text-sm font-semibold tracking-widest text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
