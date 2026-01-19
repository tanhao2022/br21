import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import { generateServiceSchema } from "@/components/SEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "indonesia-slot-gacor");
  if (!data) {
    return {
      title: "印尼 Slot Gacor 代投",
      description: "印尼市场Slot Gacor推广服务",
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

export default async function IndonesiaSlotGacorPage() {
  const data = getMDXContent("pages", "indonesia-slot-gacor");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const jsonLd = generateServiceSchema({
    serviceType: "Slot Advertising",
    serviceName: data.frontMatter.title,
    description: data.frontMatter.description,
    areaServed: ["Indonesia"],
    offers: [
      {
        name: "Indonesia Slot Gacor Ads",
        description: "印尼市场Slot Gacor推广服务",
      },
      {
        name: "Dana/OVO Payment Optimization",
        description: "Dana/OVO支付通道优化服务",
      },
      {
        name: "KOL Live Streaming",
        description: "印尼本地KOL直播带玩服务",
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
