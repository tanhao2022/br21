import { MetadataRoute } from "next";
import { getMDXFiles } from "@/lib/utils/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

  // 获取动态路由
  const serviceFiles = getMDXFiles("pages");
  const blogFiles = getMDXFiles("blog");

  // 构建时验证：如果文件数量异常，输出警告
  if (process.env.NODE_ENV === "production" || process.env.NEXT_PHASE === "phase-production-build") {
    console.log(`[sitemap] ===== Sitemap Generation Diagnostics =====`);
    console.log(`[sitemap] Current working directory: ${process.cwd()}`);
    console.log(`[sitemap] Service files found: ${serviceFiles.length}`);
    console.log(`[sitemap] Blog files found: ${blogFiles.length}`);
    
    if (serviceFiles.length === 0) {
      console.error(`[sitemap] ERROR: No service files found in content/pages`);
      console.error(`[sitemap] This indicates a deployment configuration issue`);
      console.error(`[sitemap] Please check if content/ directory is included in deployment`);
    } else if (serviceFiles.length < 50) {
      console.warn(`[sitemap] WARNING: Only ${serviceFiles.length} service files found (expected ~107)`);
      console.warn(`[sitemap] This may indicate partial deployment or path resolution issue`);
    }
    
    if (blogFiles.length === 0) {
      console.warn(`[sitemap] WARNING: No blog files found in content/blog`);
    }
    
    console.log(`[sitemap] Generating sitemap with ${serviceFiles.length} service pages and ${blogFiles.length} blog posts`);
    console.log(`[sitemap] Total URLs: ${5 + serviceFiles.length + blogFiles.length}`);
    console.log(`[sitemap] ==========================================`);
  }

  // 生成服务页面路由（从 content/pages 目录）
  const serviceRoutes = serviceFiles.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    return {
      url: `${baseUrl}/zh/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  // 生成博客文章路由（从 content/blog 目录）
  const blogRoutes = blogFiles.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    return {
      url: `${baseUrl}/zh/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  // 静态路由
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // 首页最高优先级
    },
    {
      url: `${baseUrl}/zh/markets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // 合并所有路由
  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}