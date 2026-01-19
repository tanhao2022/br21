import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import { generateServiceSchema } from "@/components/SEO";
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

export default async function PhilippinesJiliGcashPage() {
  const data = getMDXContent("pages", "philippines-jili-gcash");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const jsonLd = generateServiceSchema({
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
