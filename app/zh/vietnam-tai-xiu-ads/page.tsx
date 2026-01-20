import { Metadata } from "next";
import { getMDXContent, getRelatedPosts } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
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
  const data = getMDXContent("pages", "vietnam-tai-xiu-ads");
  if (!data) {
    return {
      title: "越南 Tài Xỉu & Nổ Hũ 代投",
      description: "越南市场Tài Xỉu和Nổ Hũ游戏推广服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "vietnam-tai-xiu-ads");
}

export default async function VietnamTaiXiuAdsPage() {
  const data = getMDXContent("pages", "vietnam-tai-xiu-ads");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const serviceSchema = generateServiceSchema({
    serviceType: "Slot Advertising",
    serviceName: data.frontMatter.title,
    description: data.frontMatter.description,
    areaServed: ["Vietnam"],
    offers: [
      {
        name: "Vietnam Tài Xỉu Ads",
        description: "越南市场Tài Xỉu和Nổ Hũ游戏推广服务",
      },
      {
        name: "Zalo Private Traffic",
        description: "Zalo私域引流服务",
      },
      {
        name: "MoMo Payment Optimization",
        description: "MoMo支付通道优化服务",
      },
    ],
  });

  // 生成 FAQ Schema（如果存在）
  const faqSchema =
    data.frontMatter.faq && data.frontMatter.faq.length > 0
      ? generateFAQSchema(data.frontMatter.faq)
      : null;

  // 获取相关文章
  const relatedPosts = getRelatedPosts("Vietnam", 3);

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
