import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import { generateServiceSchema } from "@/components/SEO";
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

  const jsonLd = generateServiceSchema({
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        frontMatter={data.frontMatter}
        content={
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.content}
          </ReactMarkdown>
        }
      />
    </>
  );
}