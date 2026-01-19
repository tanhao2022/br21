import Link from "next/link";
import { Send, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">
          页面未找到
        </h2>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          您访问的页面可能已被移动或删除。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/zh"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Home className="h-5 w-5" />
            返回首页
          </Link>
          <Link
            href="https://t.me/youfa8577"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#0077b3] active:scale-95"
          >
            <Send className="h-5 w-5" />
            Telegram 联系
          </Link>
        </div>
      </div>
    </div>
  );
}
