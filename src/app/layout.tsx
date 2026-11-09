import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefin = Josefin_Sans({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "FH WEB DESIGN | RePace 開発中",
  description:
    "FH WEB DESIGN 公式サイト。週間行動＆気分記録アプリ『RePace』を開発中です。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${josefin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
