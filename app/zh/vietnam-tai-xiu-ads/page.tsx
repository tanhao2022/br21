import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import ArticleLayout from "@/components/ArticleLayout";
import { generateServiceSchema } from "@/components/SEO";
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

export default async function VietnamTaiXiuAdsPage() {
  const data = getMDXContent("pages", "vietnam-tai-xiu-ads");

  if (!data) {
    return <div>内容未找到</div>;
  }

  const jsonLd = generateServiceSchema({
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
