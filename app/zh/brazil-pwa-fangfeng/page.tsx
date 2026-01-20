import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "brazil-pwa-fangfeng");
  if (!data) {
    return {
      title: "巴西PWA防封代投",
      description: "巴西市场的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "brazil-pwa-fangfeng");
}

export default async function BrazilPwaFangfengPage() {
  const data = getMDXContent("pages", "brazil-pwa-fangfeng");

  if (!data) {
    return <div>内容未找到</div>;
  }

  return (
    <ServicePage
      data={data}
      content={
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.content}
        </ReactMarkdown>
      }
    />
  );
}
