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
    "/zh/about",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/zh" ? 1 : 0.8,
  }));
}