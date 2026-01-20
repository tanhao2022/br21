import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "slot-capi");
  if (!data) {
    return {
      title: "SlotCAPI代投",
      description: "专业的slot类项目广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "slot-capi");
}

export default async function SlotCapiPage() {
  const data = getMDXContent("pages", "slot-capi");

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
