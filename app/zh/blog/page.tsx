import Link from "next/link";
import type { Metadata } from "next";
import { getAllMDXContent } from "@/lib/utils/mdx";

export const metadata: Metadata = {
  title: "行业洞察",
  description: "BR21 专业团队分享 iGaming 市场趋势、技术解决方案和成功案例",
};

// 分类标签映射
const categoryTagMap: Record<string, string> = {
  "市场趋势": "Market Report",
  "技术方案": "Tech Solution",
  "成功案例": "Case Study",
  "Technical": "Tech Solution",
};

export default function BlogPage() {
  // 从 content/blog 目录自动读取所有文章
  const allPosts = getAllMDXContent("blog");

  // 按日期倒序排序（最新的在前）
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = a.frontMatter.date
      ? new Date(a.frontMatter.date).getTime()
      : 0;
    const dateB = b.frontMatter.date
      ? new Date(b.frontMatter.date).getTime()
      : 0;
    return dateB - dateA;
  });

  // 转换为显示格式
  const blogPosts = sortedPosts.map((post) => {
    const category = post.frontMatter.category || "未分类";
    const tag = categoryTagMap[category] || "Article";
    const summary =
      post.frontMatter.description ||
      post.frontMatter.quickAnswer ||
      "专业团队分享 iGaming 市场趋势、技术解决方案和成功案例。";

    return {
      slug: post.slug,
      title: post.frontMatter.title,
      summary: summary.length > 150 ? summary.substring(0, 150) + "..." : summary,
      date: post.frontMatter.date || new Date().toISOString(),
      category: category,
      tag: tag,
    };
  });
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
