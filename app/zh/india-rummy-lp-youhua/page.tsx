import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "india-rummy-lp-youhua");
  if (!data) {
    return {
      title: "印度RummyLpYouhua代投",
      description: "印度市场的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "india-rummy-lp-youhua");
}

export default async function IndiaRummyLpYouhuaPage() {
  const data = getMDXContent("pages", "india-rummy-lp-youhua");

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
