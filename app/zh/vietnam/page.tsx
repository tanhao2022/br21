import { Metadata } from "next";
import { getMDXContent } from "@/lib/utils/mdx";
import { generateServiceMetadata } from "@/lib/utils/metadata";
import ServicePage from "@/components/ServicePage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { marketServiceMatrix } from "@/lib/seo-matrix";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = getMDXContent("pages", "vietnam");
  if (data) {
    return generateServiceMetadata(data.frontMatter, "vietnam");
  }

  return {
    title: "越南老虎机代投 | 越南 iGaming 广告投放 | BR21",
    description:
      "BR21 提供越南市场专业 Slot 代投服务，支持 MoMo、ZaloPay 支付优化，Zalo 私域运营，Tài Xỉu & Nổ Hũ 推广。ROI 稳定在 130%-230%。",
    keywords:
      "越南老虎机代投, 越南 Slot 广告, MoMo 支付优化, Zalo 私域, Tài Xỉu, Nổ Hũ, 越南 iGaming",
    alternates: {
      canonical: `${baseUrl}/zh/vietnam/`,
    },
  };
}

export default async function VietnamPage() {
  const data = getMDXContent("pages", "vietnam");

  if (data) {
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

  const services = marketServiceMatrix.services;
  const features = marketServiceMatrix.features;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        越南 iGaming 广告投放解决方案
      </h1>
      <p className="mb-8 text-lg leading-8 text-gray-700 dark:text-gray-300">
        越南玩家赌性极强，单次充值大，LTV高。BR21 深耕越南市场，提供 MoMo、ZaloPay
        支付优化，Zalo 私域运营，以及 Tài Xỉu、Nổ Hũ 等本地热门游戏的广告投放服务。
        通过完善的技术对接和多通道备选，MoMo 支付成功率提升至 95% 以上。
      </p>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          越南市场核心优势
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              MoMo 支付优化
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              多通道备选，支付成功率提升至 95%+
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Zalo 私域运营
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              流量存到私域，不受平台封号影响
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Reels 推广
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              品牌词霸屏，多账户矩阵策略
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          越南市场服务矩阵
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
            >
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                {service.nameZh}
              </h3>
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.slug}>
                    <Link
                      href={`/zh/vietnam/${service.slug}/${feature.slug}/`}
                      className="block rounded px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      {feature.nameZh}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
