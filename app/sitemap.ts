import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://br21.com";

  const routes = [
    "",
    "/zh",
    "/zh/slot-ditou",
    "/zh/laohuji-ditou",
    "/zh/brazil-slot-ditou",
    "/zh/brazil-slot-ditou/facebook",
    "/zh/brazil-slot-ditou/risk",
    "/zh/markets",
    "/zh/india-rummy-uac",
    "/zh/indonesia-slot-gacor",
    "/zh/philippines-jili-gcash",
    "/zh/vietnam-tai-xiu-ads",
    "/zh/bangladesh-betting-traffic",
    "/zh/about",
    "/zh/blog", // Blog index page
    "/zh/blog/2026-brazil-igaming-payment-report", // Blog posts
    "/zh/blog/facebook-cloaking-3-0-solution",
    "/zh/blog/india-rummy-uac-case-study",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/zh" ? 1 : 0.8,
  }));
}