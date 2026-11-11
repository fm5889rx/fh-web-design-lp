import Image from "next/image";

// ボット(メールアドレスの自動収集)対策として、
// 連絡先はテキストやリンクではなく画像で表示する。
// alt にも実際の文字列は入れない。
const IMAGES = {
  mail: { src: "/contact/mail.png", width: 657, height: 73, alt: "メールアドレス（画像）", className: "h-[18px]" },
  address: { src: "/contact/address.png", width: 176, height: 81, alt: "所在地（画像）", className: "h-5" },
} as const;

export function ContactImage({ kind }: { kind: keyof typeof IMAGES }) {
  const { src, width, height, alt, className } = IMAGES[kind];
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`inline-block ${className} w-auto align-middle`}
    />
  );
}
