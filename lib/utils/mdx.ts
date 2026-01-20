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

const contentDirectory = path.join(process.cwd(), "content");

export function getMDXFiles(directory: string): string[] {
  const dirPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getMDXContent(
  directory: string,
  slug: string
): MDXContent | null {
  const filePath = path.join(contentDirectory, directory, `${slug}.mdx`);
  const mdPath = path.join(contentDirectory, directory, `${slug}.md`);

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