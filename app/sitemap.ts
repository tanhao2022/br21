import { MetadataRoute } from "next";
import { marketServiceMatrix } from "@/lib/seo-matrix";
import { getMDXFiles } from "@/lib/utils/mdx";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

/**
 * 获取 /zh 下所有静态页面路由（排除动态路由和特殊页面）
 */
function getStaticPageSlugs(): string[] {
  const zhDir = path.join(process.cwd(), "app", "zh");
  const slugs: string[] = [];

  try {
    const entries = fs.readdirSync(zhDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      // 跳过动态路由目录
      if (entry.name.startsWith("[")) continue;
      // 跳过博客（单独处理）
      if (entry.name === "blog") continue;
      // 跳过已在 sitemap 中单独添加的页面
      if (["solutions", "sitemap", "markets"].includes(entry.name)) continue;
      // 跳过市场着陆页（单独添加）
      const marketSlugs = marketServiceMatrix.markets.map((m) => m.slug);
      if (marketSlugs.includes(entry.name)) continue;

      // 检查是否有 page.tsx
      const pagePath = path.join(zhDir, entry.name, "page.tsx");
      if (fs.existsSync(pagePath)) {
        slugs.push(entry.name);
      }
    }
  } catch (error) {
    console.warn(`[sitemap] Failed to scan static pages: ${error}`);
  }

  return slugs;
}

/**
 * 生成单个统一的 Sitemap
 *
 * 包含：首页、市场着陆页、动态服务页、博客、静态页面
 * 不包含：会重定向的 URL（如 /）、不存在的页面
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 需要排除的市场（没有着陆页的市场）
  const marketsWithLandingPage = new Set<string>();
  const zhDir = path.join(process.cwd(), "app", "zh");
  for (const market of marketServiceMatrix.markets) {
    const landingPage = path.join(zhDir, market.slug, "page.tsx");
    if (fs.existsSync(landingPage)) {
      marketsWithLandingPage.add(market.slug);
    }
  }

  // 1. 中文首页（不添加 /，因为它会 redirect 到 /zh/，会导致 GSC "网页会自动重定向"）
  sitemapEntries.push({
    url: `${baseUrl}/zh/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  });

  // 2. 市场着陆页（仅添加实际存在的页面）
  for (const market of marketServiceMatrix.markets) {
    if (marketsWithLandingPage.has(market.slug)) {
      sitemapEntries.push({
        url: `${baseUrl}/zh/${market.slug}/`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      });
    }
  }

  // 3. 动态服务页面（所有 Market * Service * Feature 组合）
  for (const market of marketServiceMatrix.markets) {
    for (const service of marketServiceMatrix.services) {
      for (const feature of marketServiceMatrix.features) {
        sitemapEntries.push({
          url: `${baseUrl}/zh/${market.slug}/${service.slug}/${feature.slug}/`,
          lastModified: new Date(),
          changeFrequency: "daily" as const,
          priority: 0.9,
        });
      }
    }
  }

  // 4. 博客文章
  try {
    const blogFiles = getMDXFiles("blog");
    for (const file of blogFiles) {
      const slug = file.replace(/\.(mdx|md)$/, "");
      sitemapEntries.push({
        url: `${baseUrl}/zh/blog/${slug}/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  } catch (error) {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      console.warn(`[sitemap] Failed to read blog files: ${error}`);
    }
  }

  // 5. 静态页面（solutions, blog listing, sitemap, markets, about）
  const staticPages = [
    { path: "solutions", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "blog", priority: 0.8, changeFrequency: "daily" as const },
    { path: "markets", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "sitemap", priority: 0.5, changeFrequency: "weekly" as const },
  ];

  for (const page of staticPages) {
    sitemapEntries.push({
      url: `${baseUrl}/zh/${page.path}/`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // 6. 长尾静态页面（SEO 关键词页面，如 brazil-pix-slot、slot-ditou 等）
  const staticPageSlugs = getStaticPageSlugs();
  for (const slug of staticPageSlugs) {
    sitemapEntries.push({
      url: `${baseUrl}/zh/${slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    });
  }

  // 构建时输出统计信息
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    console.log(
      `[sitemap] Generated unified sitemap with ${sitemapEntries.length} URLs:`
    );
    console.log(`[sitemap]   - 1 homepage`);
    console.log(
      `[sitemap]   - ${marketsWithLandingPage.size} market landing pages`
    );
    console.log(
      `[sitemap]   - ${marketServiceMatrix.markets.length * marketServiceMatrix.services.length * marketServiceMatrix.features.length} service/feature pages`
    );
    console.log(`[sitemap]   - ${staticPageSlugs.length} long-tail static pages`);
    console.log(
      `[sitemap]   - ${sitemapEntries.length - 1 - marketsWithLandingPage.size - marketServiceMatrix.markets.length * marketServiceMatrix.services.length * marketServiceMatrix.features.length - staticPageSlugs.length} other pages`
    );
  }

  return sitemapEntries;
}
