import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "indonesia-slot-buzhuanhua");
  if (!data) {
    return {
      title: "印尼Slot不转化代投",
      description: "印尼市场的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "indonesia-slot-buzhuanhua");
}

export default async function IndonesiaSlotBuzhuanhuaPage() {
  const data = getMDXContent("pages", "indonesia-slot-buzhuanhua");

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
