import Link from "next/link";
import { MDXContent } from "@/lib/utils/mdx";

interface RelatedPostsProps {
  posts: MDXContent[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="my-12 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        相关文章推荐
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/zh/blog/${post.slug}`}
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-3 flex items-center gap-2">
              {post.frontMatter.category && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {post.frontMatter.category}
                </span>
              )}
              {post.frontMatter.date && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(post.frontMatter.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
            <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {post.frontMatter.title}
            </h3>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              {post.frontMatter.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
