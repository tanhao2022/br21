import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MDXFrontMatter {
  title: string;
  description: string;
  keywords?: string;
  quickAnswer?: string;
  keyPoints?: string[];
  process?: Array<{ title: string; description: string }>;
  risks?: string[];
  faq?: Array<{ question: string; answer: string }>;
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