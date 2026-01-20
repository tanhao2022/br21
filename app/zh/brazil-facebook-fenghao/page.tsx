import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "brazil-facebook-fenghao");
  if (!data) {
    return {
      title: "巴西Facebook封号代投",
      description: "巴西市场的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "brazil-facebook-fenghao");
}

export default async function BrazilFacebookFenghaoPage() {
  const data = getMDXContent("pages", "brazil-facebook-fenghao");

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
