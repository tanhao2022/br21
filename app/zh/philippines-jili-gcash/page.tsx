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
  const data = getMDXContent("pages", "philippines-jili-gcash");
  if (!data) {
    return {
      title: "菲律宾 JILI/FC 电子代投",
      description: "菲律宾市场JILI和FC游戏推广服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "philippines-jili-gcash");
}

export default async function PhilippinesJiliGcashPage() {
  const data = getMDXContent("pages", "philippines-jili-gcash");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const serviceSchema = generateServiceSchema({
    serviceType: "Slot Advertising",
    serviceName: data.frontMatter.title,
    description: data.frontMatter.description,
    areaServed: ["Philippines"],
    offers: [
      {
        name: "Philippines JILI/FC Ads",
        description: "菲律宾市场JILI和FC游戏推广服务",
      },
      {
        name: "GCash Payment Optimization",
        description: "GCash支付通道对接与优化服务",
      },
      {
        name: "Messenger Bot Retargeting",
        description: "Messenger Bot二次追单服务",
      },
    ],
  });

  // 生成 FAQ Schema（如果存在）
  const faqSchema =
    data.frontMatter.faq && data.frontMatter.faq.length > 0
      ? generateFAQSchema(data.frontMatter.faq)
      : null;

  // 获取相关文章
  const relatedPosts = getRelatedPosts("Philippines", 3);

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
