import { Metadata } from "next";
import Link from "next/link";
import { marketServiceMatrix } from "@/lib/seo-matrix";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

export const metadata: Metadata = {
  title: "全球 iGaming 市场解决方案 | BR21",
  description: "BR21 提供全球 iGaming 市场解决方案，覆盖巴西、菲律宾、印度、印尼、越南等核心市场，以及全球通用服务。按国家分类浏览所有服务页面。",
  keywords: "iGaming 解决方案, Slot 代投, 全球市场, 巴西, 菲律宾, 印度, 印尼, 越南",
  alternates: {
    canonical: `${baseUrl}/zh/solutions/`,
  },
};

// 市场旗帜映射
const marketFlags: Record<string, string> = {
  brazil: "🇧🇷",
  philippines: "🇵🇭",
  india: "🇮🇳",
  indonesia: "🇮🇩",
  vietnam: "🇻🇳",
  global: "🌏",
};

export default function SolutionsPage() {
  const { markets, services, features } = marketServiceMatrix;

  // 将 Global 市场放在最后
  const sortedMarkets = [...markets].sort((a, b) => {
    if (a.slug === "global") return 1;
    if (b.slug === "global") return -1;
    return 0;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* 页面标题 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          全球 iGaming 市场解决方案
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          BR21 提供覆盖全球核心 iGaming 市场的专业解决方案，按国家分类浏览所有服务页面
        </p>
      </div>

      {/* 市场分类展示 */}
      <div className="space-y-16">
        {sortedMarkets.map((market) => {
          const flag = marketFlags[market.slug] || "🌍";
          const isGlobal = market.slug === "global";

          return (
            <section
              key={market.slug}
              className={`rounded-lg border-2 p-8 ${
                isGlobal
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
            >
              {/* 市场标题 */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-4xl">{flag}</span>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {market.nameZh} ({market.name})
                  </h2>
                  {!isGlobal && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      货币: {market.currency} | 语言: {market.language}
                    </p>
                  )}
                </div>
              </div>

              {/* 服务网格 */}
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
                      {features.map((feature) => {
                        const url = `/zh/${market.slug}/${service.slug}/${feature.slug}/`;
                        const linkText = `${feature.nameZh}`;
                        return (
                          <li key={feature.slug}>
                            <Link
                              href={url}
                              className="block rounded px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300"
                            >
                              {linkText}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 市场聚合页链接 */}
              <div className="mt-6 text-center">
                <Link
                  href={`/zh/${market.slug}/`}
                  className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  查看 {market.nameZh} 所有解决方案 →
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      {/* 统计信息 */}
      <div className="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {markets.length}
          </span>{" "}
          个市场 ×{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {services.length}
          </span>{" "}
          种服务 ×{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {features.length}
          </span>{" "}
          项功能 ={" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {markets.length * services.length * features.length}
          </span>{" "}
          个专业解决方案页面
        </p>
      </div>
    </div>
  );
}
