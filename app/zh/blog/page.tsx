import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行业洞察",
  description: "BR21 专业团队分享 iGaming 市场趋势、技术解决方案和成功案例",
};

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  tag: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "2026-brazil-igaming-payment-report",
    title: "2026 巴西 iGaming 支付报告：PIX 成功率分析",
    summary: "深度分析巴西 PIX 支付在 slot 游戏中的失败原因及解决方案，包含真实数据与优化建议。",
    date: "2026-01-22",
    category: "市场趋势",
    tag: "Market Report",
  },
  {
    slug: "facebook-cloaking-3-0-solution",
    title: "Facebook Cloaking 3.0：iGaming 广告防封技术详解",
    summary: "揭秘企业级 Cloaking 技术原理，如何通过 IP 指纹识别与动态域名轮询实现 99%+ 过审率。",
    date: "2026-01-20",
    category: "技术方案",
    tag: "Tech Solution",
  },
  {
    slug: "india-rummy-uac-case-study",
    title: "印度 Rummy 案例：如何通过 UAC 2.5 实现 500% ROI",
    summary: "真实案例拆解：从 0 到日耗 $50K，印度 Rummy 市场如何通过 Google UAC 事件优化实现规模化增长。",
    date: "2026-01-18",
    category: "成功案例",
    tag: "Case Study",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          行业洞察
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          专业团队分享 iGaming 市场趋势、技术解决方案和成功案例
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/zh/blog/${post.slug}`}
            className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex-1 p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {post.tag}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {post.category}
                </span>
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {post.summary}
              </p>
              <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
