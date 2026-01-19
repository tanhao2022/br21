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
  const data = getMDXContent("pages", "bangladesh-betting-traffic");
  if (!data) {
    return {
      title: "孟加拉板球 & Slot 代投",
      description: "孟加拉市场Cricket Betting和Aviator游戏推广服务",
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

export default async function BangladeshBettingTrafficPage() {
  const data = getMDXContent("pages", "bangladesh-betting-traffic");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const serviceSchema = generateServiceSchema({
    serviceType: "Slot Advertising",
    serviceName: data.frontMatter.title,
    description: data.frontMatter.description,
    areaServed: ["Bangladesh"],
    offers: [
      {
        name: "Bangladesh Cricket Betting Ads",
        description: "孟加拉市场板球博彩推广服务",
      },
      {
        name: "Aviator Game Promotion",
        description: "Aviator游戏推广服务",
      },
      {
        name: "bKash Payment Integration",
        description: "bKash/Nagad支付通道对接服务",
      },
    ],
  });

  // 生成 FAQ Schema（如果存在）
  const faqSchema =
    data.frontMatter.faq && data.frontMatter.faq.length > 0
      ? generateFAQSchema(data.frontMatter.faq)
      : null;

  // 获取相关文章
  const relatedPosts = getRelatedPosts("Bangladesh", 3);

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
