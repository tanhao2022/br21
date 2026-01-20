import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "brazil-slot-ditou");
  if (!data) {
    return {
      title: "巴西老虎机代投",
      description: "巴西市场的slot广告投放服务",
    };
  }

  return generateServiceMetadata(data.frontMatter, "brazil-slot-ditou");
}

export default async function BrazilSlotDitouPage() {
  const data = getMDXContent("pages", "brazil-slot-ditou");

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
