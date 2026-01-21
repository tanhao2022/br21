import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { marketServiceMatrix } from "@/lib/seo-matrix";

export const metadata: Metadata = {
  title: "BR21 | 老虎机代投服务",
  description: "专业的slot类项目广告投放服务，专注巴西市场",
};

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const markets = marketServiceMatrix.markets;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* 热门入口 */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                热门入口
              </h3>
              <ul className="space-y-2">
                {markets.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={`/zh/${market.slug}/`}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {market.nameZh} iGaming Solutions
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 占位列（可扩展） */}
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 BR21. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/zh/solutions"
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  市场解决方案
                </Link>
                <span className="text-xs text-gray-400">|</span>
                <Link
                  href="/zh/sitemap/"
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  全站索引
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}