import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Workers では画像最適化(IMAGES binding)を使わず、リサイズ済みの静的画像をそのまま配信する
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
