import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "philippines-slot-pao-liang");
  if (!data) {
    return {
      title: "菲律宾Slot跑量代投",
      description: "菲律宾市场跑量优化的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "philippines-slot-pao-liang");
}

export default async function PhilippinesSlotPaoLiangPage() {
  const data = getMDXContent("pages", "philippines-slot-pao-liang");

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
