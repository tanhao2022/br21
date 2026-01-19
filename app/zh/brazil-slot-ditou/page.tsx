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
  const data = getMDXContent("pages", "brazil-slot-ditou");
  if (!data) {
    return {
      title: "巴西老虎机代投",
      description: "巴西市场的slot广告投放服务",
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

export default async function BrazilSlotDitouPage() {
  const data = getMDXContent("pages", "brazil-slot-ditou");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const serviceSchema = generateServiceSchema({
    serviceType: "Slot Advertising",
    serviceName: data.frontMatter.title,
    description: data.frontMatter.description,
    areaServed: ["Brazil"],
    offers: [
      {
        name: "Brazil Facebook Slot Ads",
        description: "巴西市场Facebook和Instagram平台的slot类项目广告投放服务",
      },
      {
        name: "Brazil Google Slot Ads",
        description: "巴西市场Google Ads平台的slot类项目广告投放服务",
      },
      {
        name: "Brazil Market Analysis",
        description: "巴西市场深度分析和合规策略制定服务",
      },
      {
        name: "Brazil Account Management",
        description: "符合巴西市场要求的广告账户注册、管理和维护服务",
      },
    ],
  });

  // 生成 FAQ Schema（如果存在）
  const faqSchema =
    data.frontMatter.faq && data.frontMatter.faq.length > 0
      ? generateFAQSchema(data.frontMatter.faq)
      : null;

  // 获取相关文章（基于 Brazil 关键词）
  const relatedPosts = getRelatedPosts("Brazil", 3);

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