import React from "react";
import { MDXContent, getRelatedPosts } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import { generateServiceSchema, generateFAQSchema } from "@/components/SEO";
import RelatedPosts from "@/components/RelatedPosts";
import CTA from "@/components/CTA";
import Link from "next/link";

interface ServicePageProps {
  /**
   * MDX 内容数据
   */
  data: MDXContent;
  /**
   * 渲染后的内容（通常是 ReactMarkdown 组件）
   */
  content: React.ReactNode;
  /**
   * 相关文章数量限制，默认 3
   */
  relatedPostsLimit?: number;
  /**
   * 是否显示内链导航，默认 true
   */
  showInternalLinks?: boolean;
}

/**
 * ServicePage 模板组件
 * 
 * 用于统一渲染所有老虎机代投 SEO 服务页面。
 * 自动处理 Schema 生成、内链、相关文章推荐和 CTA。
 * 
 * @example
 * ```tsx
 * const data = getMDXContent("pages", "brazil-slot-ditou");
 * return (
 *   <ServicePage
 *     data={data}
 *     content={<ReactMarkdown>{data.content}</ReactMarkdown>}
 *   />
 * );
 * ```
 */
export default function ServicePage({
  data,
  content,
  relatedPostsLimit = 3,
  showInternalLinks = true,
}: ServicePageProps) {
  const { frontMatter, slug } = data;

  // 生成 Service Schema
  const serviceSchema = generateServiceSchema({
    serviceType: frontMatter.serviceType || "Slot Advertising",
    serviceName: frontMatter.title,
    description: frontMatter.description,
    areaServed: frontMatter.country ? [frontMatter.country] : undefined,
    offers: [
      {
        name: `${frontMatter.country || ""} ${frontMatter.serviceType || "Slot"} Ads`,
        description: frontMatter.description,
      },
    ],
  });

  // 生成 FAQ Schema（如果存在）
  const faqSchema =
    frontMatter.faq && frontMatter.faq.length > 0
      ? generateFAQSchema(frontMatter.faq)
      : null;

  // 获取相关文章（基于 country 或 tags）
  const relatedTag = frontMatter.country || frontMatter.tags?.[0] || "";
  const relatedPosts =
    relatedTag && relatedPostsLimit > 0
      ? getRelatedPosts(relatedTag, relatedPostsLimit, slug)
      : [];

  // 生成内链
  const internalLinks: Array<{ href: string; label: string }> = [];
  
  if (showInternalLinks) {
    // 通用 Slot 代投页面
    internalLinks.push({
      href: "/zh/slot-ditou",
      label: "Slot 代投服务",
    });

    // 国家主页面（如果提供了 countrySlug）
    if (frontMatter.countrySlug) {
      internalLinks.push({
        href: `/zh/${frontMatter.countrySlug}`,
        label: `${frontMatter.country || ""} 市场详情`,
      });
    }

    // 市场总览页面
    internalLinks.push({
      href: "/zh/markets",
      label: "所有市场",
    });
  }

  return (
    <>
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 主要内容 */}
      <ArticleLayout frontMatter={frontMatter} content={content} />

      {/* 内链导航 */}
      {showInternalLinks && internalLinks.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 py-8">
          <nav className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              相关页面
            </h2>
            <ul className="flex flex-wrap gap-4">
              {internalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* 相关文章推荐 */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto max-w-4xl px-4">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}

      {/* CTA */}
      <div className="mx-auto max-w-4xl px-4">
        <CTA />
      </div>
    </>
  );
}
