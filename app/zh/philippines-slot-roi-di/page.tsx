import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "philippines-slot-roi-di");
  if (!data) {
    return {
      title: "菲律宾SlotRoiDi代投",
      description: "菲律宾市场的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "philippines-slot-roi-di");
}

export default async function PhilippinesSlotRoiDiPage() {
  const data = getMDXContent("pages", "philippines-slot-roi-di");

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
