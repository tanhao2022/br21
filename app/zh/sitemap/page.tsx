import { Metadata } from "next";
import { marketServiceMatrix } from "@/lib/seo-matrix";
import Link from "next/link";

export const metadata: Metadata = {
  title: "网站地图 | BR21",
  description: "BR21 全站页面索引，按国家分类浏览所有服务页面",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapPage() {
  const { markets, services, features } = marketServiceMatrix;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          网站地图
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          按国家分类浏览所有服务页面
        </p>
      </div>

      <div className="space-y-12">
        {markets.map((market) => (
          <section key={market.slug} className="border-b border-gray-200 pb-8 dark:border-gray-700 last:border-b-0">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              {market.nameZh} ({market.name})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.slug} className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {service.nameZh}
                  </h3>
                  <ul className="space-y-1">
                    {features.map((feature) => {
                      const url = `/zh/${market.slug}/${service.slug}/${feature.slug}/`;
                      const linkText = `${market.nameZh}${service.nameZh}${feature.nameZh}`;
                      return (
                        <li key={feature.slug}>
                          <Link
                            href={url}
                            className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
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
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          最后更新: {new Date().toLocaleDateString("zh-CN")}
        </p>
      </div>
    </div>
  );
}
