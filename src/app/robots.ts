import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/internal/",
          "/api/",
          "/verify-required",
          "/invalid-token",
          "/access-expired",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
