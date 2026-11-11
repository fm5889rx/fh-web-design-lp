import Image from "next/image";

// ボット(メールアドレス・電話番号の自動収集)対策として、
// 連絡先はテキストやリンクではなく画像で表示する。
// alt にも実際の文字列は入れない。
const IMAGES = {
  tel: { src: "/contact/tel.png", width: 408, height: 73, alt: "電話番号（画像）" },
  mail: { src: "/contact/mail.png", width: 657, height: 73, alt: "メールアドレス（画像）" },
  address: { src: "/contact/address.png", width: 886, height: 296, alt: "所在地（画像）" },
} as const;

export function ContactImage({ kind }: { kind: keyof typeof IMAGES }) {
  const { src, width, height, alt } = IMAGES[kind];
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // 画像は 56px 文字を 1/4（=14px）で表示。住所は 3 行なので幅基準で出す
      style={kind === "address" ? { width: width / 4 } : { height: 18 }}
      className={
        kind === "address"
          ? "block h-auto max-w-full"
          : "inline-block w-auto align-middle"
      }
    />
  );
}
