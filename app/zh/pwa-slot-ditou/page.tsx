import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "pwa-slot-ditou");
  if (!data) {
    return {
      title: "PWA Slot代投",
      description: "PWA技术的slot类项目广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "pwa-slot-ditou");
}

export default async function PWASlotDitouPage() {
  const data = getMDXContent("pages", "pwa-slot-ditou");

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