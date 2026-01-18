import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BR21 | 老虎机代投服务",
  description: "专业的slot类项目广告投放服务，专注巴西市场",
};

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/zh" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              BR21
            </Link>
            <div className="flex gap-6">
              <Link
                href="/zh"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                首页
              </Link>
              <Link
                href="/zh/about"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                关于我们
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 BR21. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}