import { MetadataRoute } from "next";
import { marketServiceMatrix } from "@/lib/seo-matrix";
import { getMDXFiles } from "@/lib/utils/mdx";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

/**
 * 生成单个统一的 Sitemap
 * 
 * 由于静态导出（output: "export"）不支持动态 sitemap 路由，
 * 我们生成一个包含所有 URL 的单一 sitemap 文件。
 * 
 * 注意：Google 建议每个 sitemap 最多包含 50,000 个 URL。
 * 如果超过此限制，需要拆分为多个 sitemap 并创建 sitemap index。
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 构建时验证
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    console.log(`[sitemap] Generating unified sitemap for all markets...`);
  }

  // 1. 添加首页
  sitemapEntries.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  });

  // 2. 添加中文首页
  sitemapEntries.push({
    url: `${baseUrl}/zh/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  });

  // 3. 为每个市场生成 URL
  for (const market of marketServiceMatrix.markets) {
    // 3.1 添加市场主页面（优先级 1.0）
    sitemapEntries.push({
      url: `${baseUrl}/zh/${market.slug}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    });

    // 3.2 生成所有 Market * Service * Feature 组合的 URL
    // URL 结构: /zh/{marketSlug}/{serviceSlug}/{featureSlug}
    for (const service of marketServiceMatrix.services) {
      for (const feature of marketServiceMatrix.features) {
        sitemapEntries.push({
          url: `${baseUrl}/zh/${market.slug}/${service.slug}/${feature.slug}/`,
          lastModified: new Date(),
          changeFrequency: "daily" as const,
          priority: 0.9, // 高价值服务/功能页面
        });
      }
    }
  }

  // 4. 添加博客文章
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

  // 5. 添加其他静态页面
  // 例如：关于页面、HTML sitemap 等
  sitemapEntries.push({
    url: `${baseUrl}/zh/sitemap/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  });

  // 构建时输出统计信息
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    const serviceFeatureCount =
      marketServiceMatrix.services.length *
      marketServiceMatrix.features.length;
    const marketCount = marketServiceMatrix.markets.length;
    const totalServiceFeaturePages = marketCount * serviceFeatureCount;
    
    console.log(`[sitemap] Generated unified sitemap with ${sitemapEntries.length} URLs:`);
    console.log(`[sitemap]   - 2 homepage URLs (priority 1.0)`);
    console.log(`[sitemap]   - ${marketCount} market landing pages (priority 1.0)`);
    console.log(`[sitemap]   - ${totalServiceFeaturePages} service/feature pages (priority 0.9)`);
    console.log(`[sitemap]   - ${sitemapEntries.length - totalServiceFeaturePages - marketCount - 2} other pages`);
    
    // 检查是否超过 Google 建议的限制
    if (sitemapEntries.length > 50000) {
      console.warn(
        `[sitemap] WARNING: Sitemap contains ${sitemapEntries.length} URLs, which exceeds Google's recommended limit of 50,000. Consider splitting into multiple sitemaps.`
      );
    }
  }

  return sitemapEntries;
}
