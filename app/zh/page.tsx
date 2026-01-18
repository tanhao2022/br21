import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "首页",
  description: "BR21 - 专业的slot类项目广告投放服务，专注巴西市场",
};

export default function ZhHome() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        欢迎来到 BR21
      </h1>
      <p className="mb-8 text-lg leading-8 text-gray-700 dark:text-gray-300">
        专业的slot类项目广告投放服务，专注巴西市场，面向中文客户。
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/zh/brazil-slot-ditou"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            巴西老虎机代投
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            了解巴西市场的slot广告投放服务
          </p>
        </Link>

        <Link
          href="/zh/slot-ditou"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Slot代投服务
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            全面的slot类项目广告投放解决方案
          </p>
        </Link>
      </div>
    </div>
  );
}