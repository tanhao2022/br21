import { MetadataRoute } from "next";
import { marketServiceMatrix } from "@/lib/seo-matrix";
import { getMDXFiles } from "@/lib/utils/mdx";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

/**
 * 生成 Sitemap Index
 * 
 * 根据市场数据矩阵生成多个 sitemap，每个市场一个 sitemap
 * 这将生成类似 /sitemap.xml/brazil, /sitemap.xml/philippines 的 sitemap
 */
export function generateSitemaps(): Array<{ id: string }> {
  return marketServiceMatrix.markets.map((market) => ({
    id: market.slug,
  }));
}

/**
 * 生成单个市场的 Sitemap
 * 
 * @param id - 市场 slug (brazil, philippines, india, indonesia, vietnam)
 */
export default async function sitemap({
  id,
}: {
  id: string | Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  // 处理可能的 Promise
  const marketId = typeof id === "string" ? id : await id;

  // 查找对应的市场
  const market = marketServiceMatrix.markets.find((m) => m.slug === marketId);

  if (!market) {
    // 如果市场不存在，返回空数组
    console.warn(`[sitemap] Market not found: ${marketId}`);
    return [];
  }

  // 构建时验证
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    console.log(
      `[sitemap] Generating sitemap for market: ${market.nameZh} (${marketId})`
    );
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. 添加市场主页面（优先级 1.0）
  const marketLandingPage = {
    url: `${baseUrl}/zh/${marketId}/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  };
  sitemapEntries.push(marketLandingPage);

  // 2. 生成所有 Market * Service * Feature 组合的 URL
  // URL 结构: /zh/{marketSlug}/{serviceSlug}/{featureSlug}
  for (const service of marketServiceMatrix.services) {
    for (const feature of marketServiceMatrix.features) {
      sitemapEntries.push({
        url: `${baseUrl}/zh/${marketId}/${service.slug}/${feature.slug}/`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9, // 高价值服务/功能页面
      });
    }
  }

  // 3. 添加其他静态页面（如果存在）
  // 例如：博客文章、指南页面等
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
    // 如果读取失败，继续执行（不影响主要 sitemap 生成）
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      console.warn(`[sitemap] Failed to read blog files: ${error}`);
    }
  }

  // 构建时输出统计信息
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    const serviceFeatureCount =
      marketServiceMatrix.services.length *
      marketServiceMatrix.features.length;
    console.log(
      `[sitemap] Generated ${sitemapEntries.length} URLs for ${market.nameZh}:`
    );
    console.log(
      `[sitemap]   - 1 market landing page (priority 1.0)`
    );
    console.log(
      `[sitemap]   - ${serviceFeatureCount} service/feature pages (priority 0.9)`
    );
    console.log(
      `[sitemap]   - ${sitemapEntries.length - serviceFeatureCount - 1} other pages`
    );
  }

  return sitemapEntries;
}
