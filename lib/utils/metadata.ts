import { Metadata } from "next";
import { MDXFrontMatter } from "./mdx";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

/**
 * 生成服务页面的 metadata（包含 canonical）
 * 
 * 注意：canonical URL 必须带尾斜杠，与线上 308 重定向规范一致
 */
export function generateServiceMetadata(
  frontMatter: MDXFrontMatter,
  slug: string
): Metadata {
  const keywords = Array.isArray(frontMatter.keywords)
    ? frontMatter.keywords.join(", ")
    : frontMatter.keywords;

  // 确保 canonical URL 以尾斜杠结尾（处理重复斜杠）
  let canonicalPath = `/zh/${slug}`.replace(/\/+/g, "/"); // 去除重复斜杠
  if (!canonicalPath.endsWith("/")) {
    canonicalPath = `${canonicalPath}/`;
  }
  const canonical = `${baseUrl}${canonicalPath}`;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      type: "article",
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.description,
    },
  };
}
