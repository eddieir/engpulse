import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/demo", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/security", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/beta", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/resources", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
