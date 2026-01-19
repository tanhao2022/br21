import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我们",
  description: "BR21 - 全球老虎机代投服务专业团队，覆盖拉美、亚洲、非洲等主要市场",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        关于 BR21
      </h1>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
          BR21 是一家专注于全球老虎机代投服务的专业团队。我们覆盖拉美、亚洲、非洲等主要市场，为中文客户提供高质量的广告投放解决方案。无论是巴西、印度、印尼、菲律宾、越南还是孟加拉，我们都能提供针对性的市场策略和本地化服务。
        </p>
        <h2 className="mb-4 mt-8 text-3xl font-semibold text-gray-900 dark:text-gray-100">
          我们的服务
        </h2>
        <ul className="mb-4 ml-6 list-disc space-y-2">
          <li className="text-base leading-7 text-gray-700 dark:text-gray-300">
            专业的广告账户管理
          </li>
          <li className="text-base leading-7 text-gray-700 dark:text-gray-300">
            个性化的投放策略制定
          </li>
          <li className="text-base leading-7 text-gray-700 dark:text-gray-300">
            持续的数据监控和优化
          </li>
          <li className="text-base leading-7 text-gray-700 dark:text-gray-300">
            合规风险管控
          </li>
          <li className="text-base leading-7 text-gray-700 dark:text-gray-300">
            全球市场本地化服务
          </li>
        </ul>
        <h2 className="mb-4 mt-8 text-3xl font-semibold text-gray-900 dark:text-gray-100">
          联系我们
        </h2>
        <p className="mb-6 text-base leading-7 text-gray-700 dark:text-gray-300">
          如果您对我们的服务感兴趣，欢迎通过以下方式联系我们。
        </p>
        
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088cc]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Telegram
                </h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  @youfa8577
                </p>
                <Link
                  href="https://t.me/youfa8577"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0077b3]"
                >
                  发起会话
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Email
                </h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  contact@br21.com
                </p>
                <Link
                  href="mailto:contact@br21.com"
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                  发送邮件
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}