import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "india-upi-slot");
  if (!data) {
    return {
      title: "印度UPI Slot代投",
      description: "印度市场UPI支付的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "india-upi-slot");
}

export default async function IndiaUPISlotPage() {
  const data = getMDXContent("pages", "india-upi-slot");

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
