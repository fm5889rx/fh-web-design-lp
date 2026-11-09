import Image from "next/image";
import { RecordSheetPreview } from "./_components/RecordSheetPreview";

const FEATURES = [
  {
    icon: "🗓️",
    hasSheetPreview: true,
    title: "リワークの指定フォーマットを完全再現",
    description:
      "24時間の時間軸に、気分と疲労感のグラフをそのまま記録できます。",
  },
  {
    icon: "🔋",
    title: "不調時でも挫折しない、優しいスマホUI",
    description:
      "元気の残量をバッテリー型スライダーで直感的に入力。つらい日でも負担になりません。",
  },
  {
    icon: "📄",
    title: "1クリックで、医師へそのまま手渡し",
    description:
      "A4横向き1枚のPDFを自動生成。診察前のコピーの手間はもう要りません。",
  },
] as const;

function IconBadge({ icon }: { icon: string }) {
  return (
    <span
      aria-hidden
      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8DAB5] to-[#D6EFDC] text-3xl"
    >
      {icon}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#2F3437]">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#A8DAB5]/60 via-[#A8DAB5]/20 to-[#FAFAFA] px-6 pb-20 pt-12 text-center sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#A8DAB5]/40 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          {/* 白背景のロゴを #FAFAFA 上に自然に馴染ませる */}
          <Image
            src="/logo.png"
            alt="FH WEB DESIGN ロゴ"
            width={1800}
            height={1000}
            priority
            className="h-auto w-56 mix-blend-multiply sm:w-72"
          />
          <p className="mt-6 font-[family-name:var(--font-brand)] text-4xl font-light uppercase tracking-[0.3em] text-[#2F3437] sm:text-5xl lg:text-6xl">
            FH{" "}
            <span className="bg-gradient-to-r from-[#3E7A52] to-[#7CC293] bg-clip-text font-semibold text-transparent">
              WEB DESIGN
            </span>
          </p>

          <span className="mt-10 rounded-full bg-white/70 px-4 py-1 text-xs font-medium tracking-widest text-[#3E7A52] shadow-sm ring-1 ring-[#A8DAB5]">
            UNDER CONSTRUCTION
          </span>
          <h1 className="mt-6 [word-break:auto-phrase] text-balance text-2xl font-semibold leading-relaxed sm:text-3xl lg:text-4xl">
            現在、新しい生活記録Webアプリ『RePace』を開発中です
            <span className="block text-lg font-normal text-[#3E7A52] sm:text-xl">
              （2026年冬・公開予定）
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-sm leading-loose text-[#2F3437]/80 sm:text-base">
            毎日5％刻みのグラフを手描きする負担、診察前にコンビニでコピーを取るストレスをゼロに。休職中の方の心に寄り添う、優しいデジタルツールをお届けします。
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        {/* Features */}
        <section aria-labelledby="features-heading" className="py-12">
          <h2
            id="features-heading"
            className="text-center text-xl font-semibold tracking-wide sm:text-2xl"
          >
            RePace、3つの強み
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => {
              const { icon, title, description } = feature;
              return (
                <li
                  key={title}
                  className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_-12px_rgba(62,122,82,0.35)] ring-1 ring-[#A8DAB5]/60"
                >
                  {"hasSheetPreview" in feature ? (
                    // ホバー／キーボードフォーカス／タップで生活記録表の縮小イメージを表示
                    <div
                      tabIndex={0}
                      aria-label={`${title}：生活記録表のイメージを表示`}
                      className="group relative w-fit cursor-help rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#3E7A52]"
                    >
                      <IconBadge icon={icon} />
                      <div className="pointer-events-none invisible absolute left-0 top-full z-10 mt-3 translate-y-1 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus:visible group-focus:translate-y-0 group-focus:opacity-100">
                        <RecordSheetPreview />
                      </div>
                    </div>
                  ) : (
                    <IconBadge icon={icon} />
                  )}
                  <h3 className="mt-5 text-base font-semibold leading-relaxed">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-loose text-[#2F3437]/75">
                    {description}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* About */}
        <section
          aria-labelledby="about-heading"
          className="mb-16 rounded-3xl bg-gradient-to-br from-[#A8DAB5]/40 to-[#A8DAB5]/10 px-6 py-12 text-center sm:px-12"
        >
          <h2
            id="about-heading"
            className="text-xl font-semibold tracking-wide sm:text-2xl"
          >
            FH WEB DESIGNについて
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-sm leading-loose text-[#2F3437]/85 sm:text-base">
            当事務所は、Webデザインからフロントエンド・バックエンドの実装、安全なインフラ構築までをワンストップで対応するフルスタック開発を行っています。最先端のAI技術を開発プロセスに組み込むことで、圧倒的な短納期と高い品質を両立します。
          </p>
        </section>
      </main>

      <footer className="border-t border-[#A8DAB5]/60 px-6 py-8 text-center text-xs tracking-wider text-[#2F3437]/60">
        © 2026 FH WEB DESIGN. All rights reserved.
      </footer>
    </div>
  );
}
