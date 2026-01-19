import { Metadata } from "next";
import { getMDXContent, getRelatedPosts } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import {
  generateServiceSchema,
  generateFAQSchema,
} from "@/components/SEO";
import RelatedPosts from "@/components/RelatedPosts";
import CTA from "@/components/CTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "slot-ditou");
  if (!data) {
    return {
      title: "Slot代投服务",
      description: "专业的slot类项目广告投放服务",
    };
  }

  return {
    title: data.frontMatter.title,
    description: data.frontMatter.description,
    keywords: data.frontMatter.keywords,
    openGraph: {
      title: data.frontMatter.title,
      description: data.frontMatter.description,
      type: "article",
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: data.frontMatter.title,
      description: data.frontMatter.description,
    },
  };
}

export default async function SlotDitouPage() {
  const data = getMDXContent("pages", "slot-ditou");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const serviceSchema = generateServiceSchema({
    serviceType: "Slot Advertising",
    serviceName: data.frontMatter.title,
    description: data.frontMatter.description,
    areaServed: ["Brazil", "Philippines", "India", "Indonesia", "Vietnam"],
    offers: [
      {
        name: "Facebook Slot Ads",
        description: "Facebook和Instagram平台的slot类项目广告投放服务",
      },
      {
        name: "Google Slot Ads",
        description: "Google Ads平台的slot类项目广告投放服务",
      },
      {
        name: "Account Management",
        description: "广告账户注册、管理和维护服务",
      },
      {
        name: "Strategy Planning",
        description: "广告投放策略制定和优化服务",
      },
      {
        name: "Data Analytics",
        description: "投放数据监控分析和优化建议服务",
      },
    ],
  });

  // 生成 FAQ Schema（如果存在）
  const faqSchema =
    data.frontMatter.faq && data.frontMatter.faq.length > 0
      ? generateFAQSchema(data.frontMatter.faq)
      : null;

  // 获取相关文章（基于通用关键词）
  const relatedPosts = getRelatedPosts("市场", 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticleLayout
        frontMatter={data.frontMatter}
        content={
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.content}
          </ReactMarkdown>
        }
      />
      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      <CTA />
    </>
  );
}