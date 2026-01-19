import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 BR21. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}