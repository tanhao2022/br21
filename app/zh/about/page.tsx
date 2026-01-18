import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description: "BR21 - 专业的slot类项目广告投放服务团队",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        关于 BR21
      </h1>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
          BR21 是一家专注于 slot 类项目广告投放服务的专业团队。我们主要面向巴西市场，为中文客户提供高质量的广告投放解决方案。
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
        </ul>
        <h2 className="mb-4 mt-8 text-3xl font-semibold text-gray-900 dark:text-gray-100">
          联系我们
        </h2>
        <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
          如果您对我们的服务感兴趣，欢迎通过以下方式联系我们。
        </p>
      </div>
    </div>
  );
}