import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "市场解决方案 | BR21",
  description: "BR21 全球老虎机代投服务 - 覆盖拉美、亚洲、非洲等主要市场",
};

const marketSolutions = {
  "拉美市场": [
    { name: "巴西", href: "/zh/brazil-slot-ditou", flag: "🇧🇷", hot: true },
    { name: "墨西哥", href: "/zh/mexico-slot-ads", flag: "🇲🇽", hot: false },
  ],
  "亚洲市场": [
    { name: "印度", href: "/zh/india-rummy-uac", flag: "🇮🇳", hot: true },
    { name: "印尼", href: "/zh/indonesia-slot-gacor", flag: "🇮🇩", hot: true },
    { name: "菲律宾", href: "/zh/philippines-jili-gcash", flag: "🇵🇭", hot: true },
    { name: "越南", href: "/zh/vietnam-tai-xiu-ads", flag: "🇻🇳", hot: true },
    { name: "孟加拉", href: "/zh/bangladesh-betting-traffic", flag: "🇧🇩", hot: false },
  ],
  "非洲市场": [
    { name: "尼日利亚", href: "/zh/nigeria-slot-ads", flag: "🇳🇬", hot: false },
  ],
};

export default function MarketsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
        市场解决方案
      </h1>
      <p className="mb-12 text-lg leading-8 text-gray-600 dark:text-gray-400">
        BR21 提供全球老虎机代投服务，覆盖拉美、亚洲、非洲等主要市场。选择您感兴趣的市场，了解详细的投放策略和解决方案。
      </p>

      <div className="space-y-12">
        {/* 拉美市场 */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            拉美市场
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {marketSolutions["拉美市场"].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{item.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {item.name}
                    </h3>
                  </div>
                </div>
                {item.hot && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                    Hot
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* 亚洲市场 */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            亚洲市场
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {marketSolutions["亚洲市场"].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{item.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {item.name}
                    </h3>
                  </div>
                </div>
                {item.hot && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                    Hot
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* 非洲市场 */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            非洲市场
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {marketSolutions["非洲市场"].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{item.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-blue-50 p-8 text-center dark:bg-blue-900/20">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          需要更多信息？
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          如果您对特定市场有疑问，或需要定制化的投放方案，欢迎联系我们。
        </p>
        <Link
          href="https://t.me/youfa8577"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-6 py-3 text-white transition-colors hover:bg-[#0077b3]"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          通过 Telegram 联系我们
        </Link>
      </div>
    </div>
  );
}
