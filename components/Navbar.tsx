import React from "react";
import Link from "next/link";

export default function Navbar() {

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/zh"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            BR21
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/zh"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              首页
            </Link>

            <Link
              href="/zh/solutions"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              市场解决方案
            </Link>

            <Link
              href="/zh/blog"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              行业洞察
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
  );
}
