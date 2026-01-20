import { Metadata } from "next";
import { MDXFrontMatter } from "./mdx";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

/**
 * 生成服务页面的 metadata（包含 canonical）
 */
export function generateServiceMetadata(
  frontMatter: MDXFrontMatter,
  slug: string
): Metadata {
  const keywords = Array.isArray(frontMatter.keywords)
    ? frontMatter.keywords.join(", ")
    : frontMatter.keywords;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: keywords,
    alternates: {
      canonical: `${baseUrl}/zh/${slug}`,
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
