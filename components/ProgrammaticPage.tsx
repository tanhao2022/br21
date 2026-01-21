import React from "react";
import { MDXContent, getRelatedPosts } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import { generateServiceSchema, generateFAQSchema } from "@/components/SEO";
import RelatedPosts from "@/components/RelatedPosts";
import RelatedServices from "@/components/RelatedServices";
import CTA from "@/components/CTA";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BrazilComplianceSection,
  PhilippinesFunnelSection,
  IndiaUPISection,
  IndonesiaGacorSection,
  VietnamZaloSection,
} from "@/components/country-sections";

interface ProgrammaticPageProps {
  /**
   * MDX 内容数据
   */
  data: MDXContent;
  /**
   * Hero Component（Above the fold 可视化组件）
   */
  heroComponent?: React.ReactNode;
  /**
   * 路由参数（country, service, feature）
   */
  params: {
    country: string;
    service: string;
    feature: string;
  };
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
 * ProgrammaticPage 组件
 * 
 * 用于 Programmatic SEO 的动态页面渲染。
 * 根据 country 参数渲染不同的国家特定内容模块，
 * 确保每个国家的页面有独特的HTML结构，降低内容相似度。
 * 
 * @example
 * ```tsx
 * <ProgrammaticPage
 *   data={mdxData}
 *   content={<ReactMarkdown>{content}</ReactMarkdown>}
 *   params={{ country: "brazil", service: "slot", feature: "payment" }}
 * />
 * ```
 */
export default function ProgrammaticPage({
  data,
  heroComponent,
  params,
  relatedPostsLimit = 3,
  showInternalLinks = true,
}: ProgrammaticPageProps) {
  const { frontMatter, slug, content } = data;
  const { country } = params;

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
  // 安全调用 getRelatedPosts，避免文件系统错误导致页面崩溃
  let relatedPosts: MDXContent[] = [];
  try {
    const relatedTag = frontMatter.country || frontMatter.tags?.[0] || "";
    if (relatedTag && relatedPostsLimit > 0) {
      relatedPosts = getRelatedPosts(relatedTag, relatedPostsLimit, slug);
    }
  } catch (error: any) {
    // 如果获取相关文章失败，不影响页面渲染
    console.error("[ProgrammaticPage] Error getting related posts:", {
      error: error.message,
      stack: error.stack,
    });
    relatedPosts = [];
  }

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

  // 根据国家渲染不同的内容模块
  const renderCountrySpecificSection = () => {
    switch (country) {
      case "brazil":
        return <BrazilComplianceSection />;
      case "philippines":
        return <PhilippinesFunnelSection />;
      case "india":
        return <IndiaUPISection />;
      case "indonesia":
        return <IndonesiaGacorSection />;
      case "vietnam":
        return <VietnamZaloSection />;
      default:
        return null;
    }
  };

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

      {/* Hero Component (Above the fold) - 可视化组件，打破DOM重复 */}
      {heroComponent && (
        <div className="mx-auto max-w-6xl px-4 py-8">
          {heroComponent}
        </div>
      )}

      {/* 主要内容 */}
      <ArticleLayout
        frontMatter={frontMatter}
        content={<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>}
      />

      {/* 国家特定内容模块 - 插入在主要内容之后，确保HTML结构差异化 */}
      {renderCountrySpecificSection()}

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

      {/* 相关服务推荐 - Topic Cluster 结构 */}
      <div className="mx-auto max-w-6xl px-4">
        <RelatedServices
          currentCountry={params.country}
          currentService={params.service}
          currentFeature={params.feature}
        />
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-4xl px-4">
        <CTA />
      </div>
    </>
  );
}
