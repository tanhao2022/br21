import { MetadataRoute } from "next";
import { getMDXFiles } from "@/lib/utils/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

  // 获取动态路由
  const serviceFiles = getMDXFiles("pages");
  const blogFiles = getMDXFiles("blog");

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