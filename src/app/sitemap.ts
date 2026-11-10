import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fh-web-design.com/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://fh-web-design.com",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
