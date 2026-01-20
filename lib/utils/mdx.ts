import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MDXFrontMatter {
  title: string;
  description: string;
  keywords?: string | string[];
  quickAnswer?: string;
  keyPoints?: string[];
  process?: Array<{ title: string; description: string }>;
  risks?: string[];
  faq?: Array<{ question: string; answer: string }>;
  date?: string;
  category?: string;
  tags?: string[];
  // ServicePage 模板所需字段
  country?: string;
  serviceType?: string;
  countrySlug?: string; // 用于生成国家页面内链，如 "brazil-slot-ditou"
}

export interface MDXContent {
  frontMatter: MDXFrontMatter;
  content: string;
  slug: string;
}

// 增强路径解析：支持多种构建环境
// 注意：必须每次调用时动态解析，不能缓存，因为构建时工作目录可能不同
function getContentDirectory(): string {
  const cwd = process.cwd();
  
  // 尝试多个可能的路径（按优先级排序）
  const possiblePaths = [
    path.join(cwd, "content"), // 最常见情况
    path.resolve(cwd, "content"), // 绝对路径
    path.resolve(__dirname, "..", "..", "content"), // 编译后的相对路径
    path.join(cwd, "..", "content"), // monorepo 子目录情况
    path.resolve(process.cwd(), "content"), // 再次尝试绝对路径
  ];

  for (const dirPath of possiblePaths) {
    if (fs.existsSync(dirPath)) {
      // 构建时输出诊断信息
      if (process.env.NODE_ENV === "production" || process.env.NEXT_PHASE === "phase-production-build") {
        console.log(`[mdx] Content directory resolved to: ${dirPath}`);
        console.log(`[mdx] Current working directory: ${cwd}`);
      }
      return dirPath;
    }
  }

  // 如果都找不到，输出详细错误信息
  const errorMsg = `[mdx] ERROR: Content directory not found. Tried paths: ${possiblePaths.join(", ")}`;
  console.error(errorMsg);
  console.error(`[mdx] Current working directory: ${cwd}`);
  console.error(`[mdx] __dirname: ${__dirname}`);
  
  // 返回默认路径（用于错误提示）
  return path.join(cwd, "content");
}

export function getMDXFiles(directory: string): string[] {
  // 每次调用时动态获取content目录，避免模块加载时的缓存问题
  const contentDir = getContentDirectory();
  const dirPath = path.join(contentDir, directory);
  
  // 构建时验证：如果目录不存在，输出警告
  if (!fs.existsSync(dirPath)) {
    if (process.env.NODE_ENV === "production" || process.env.NEXT_PHASE === "phase-production-build") {
      console.error(`[sitemap] ERROR: Content directory not found: ${dirPath}`);
      console.error(`[sitemap] Current working directory: ${process.cwd()}`);
      console.error(`[sitemap] Content directory resolved to: ${contentDir}`);
      console.error(`[sitemap] Attempted full path: ${dirPath}`);
    }
    return [];
  }
  
  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
  
  // 构建时验证：输出文件数量（仅在构建时）
  if (process.env.NODE_ENV === "production" || process.env.NEXT_PHASE === "phase-production-build") {
    console.log(`[sitemap] Found ${files.length} MDX files in ${dirPath}`);
  }
  
  return files;
}

export function getMDXContent(
  directory: string,
  slug: string
): MDXContent | null {
  // 使用动态获取的 contentDirectory（而不是旧的常量）
  const currentContentDir = getContentDirectory();
  const filePath = path.join(currentContentDir, directory, `${slug}.mdx`);
  const mdPath = path.join(currentContentDir, directory, `${slug}.md`);

  let fullPath: string;
  if (fs.existsSync(filePath)) {
    fullPath = filePath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontMatter: data as MDXFrontMatter,
    content,
    slug,
  };
}

export function getAllMDXContent(directory: string): MDXContent[] {
  const files = getMDXFiles(directory);
  return files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      return getMDXContent(directory, slug);
    })
    .filter((content): content is MDXContent => content !== null);
}

export function getRelatedPosts(
  tag: string,
  limit: number = 3,
  excludeSlug?: string
): MDXContent[] {
  const allPosts = getAllMDXContent("blog");
  
  // 筛选包含指定 tag 的文章（通过 category 或 tags 字段）
  const relatedPosts = allPosts
    .filter((post) => {
      if (post.slug === excludeSlug) return false;
      const frontMatter = post.frontMatter;
      const categoryMatch = frontMatter.category?.toLowerCase().includes(tag.toLowerCase());
      const tagsMatch = frontMatter.tags?.some((t) =>
        t.toLowerCase().includes(tag.toLowerCase())
      );
      return categoryMatch || tagsMatch;
    })
    .sort((a, b) => {
      // 按日期倒序排序
      const dateA = a.frontMatter.date ? new Date(a.frontMatter.date).getTime() : 0;
      const dateB = b.frontMatter.date ? new Date(b.frontMatter.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);

  return relatedPosts;
}