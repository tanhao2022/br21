#!/usr/bin/env node
/**
 * SEO Quality Gate Check Script
 * 
 * 发版前自动检查SEO关键项并输出报告
 * 
 * 检查项：
 * 1. MDX文件统计
 * 2. 路由与MDX对应关系
 * 3. Frontmatter必需字段检查
 * 4. Canonical覆盖检查
 * 5. 站内链接死链检查
 * 6. Title/Description相似度报告
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface AuditResult {
  timestamp: string;
  mdxStats: {
    total: number;
    slugs: string[];
  };
  routeCoverage: {
    totalRoutes: number;
    coveredRoutes: number;
    missingMdx: string[];
    orphanMdx: string[];
  };
  frontmatterCheck: {
    total: number;
    passed: number;
    failed: Array<{
      slug: string;
      issues: string[];
    }>;
  };
  canonicalCoverage: {
    total: number;
    covered: number;
    coverageRate: number;
    missing: string[];
  };
  deadLinks: Array<{
    slug: string;
    links: Array<{
      target: string;
      line?: number;
    }>;
  }>;
  similarity: {
    titles: Array<{
      slug1: string;
      slug2: string;
      similarity: number;
      title1: string;
      title2: string;
    }>;
    descriptions: Array<{
      slug1: string;
      slug2: string;
      similarity: number;
      desc1: string;
      desc2: string;
    }>;
  };
}

// 工具函数：标准化title（用于完全相等判断）
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    // 去除中文标点
    .replace(/[，。、；：？！【】《》""''（）]/g, '')
    // 去除英文标点
    .replace(/[,.!?;:()\[\]{}'"]/g, '')
    // 去除多余空白，压缩连续空格
    .replace(/\s+/g, ' ')
    .trim();
}

// 工具函数：计算文本相似度（Jaccard相似度，用于高相似度警告）
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().match(/\w+/g) || []);
  const words2 = new Set(text2.toLowerCase().match(/\w+/g) || []);
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
}

// 读取MDX文件列表
function getMDXFiles(directory: string): string[] {
  const dirPath = path.join(process.cwd(), directory);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/, ""));
}

// 读取MDX文件frontmatter
function getMDXFrontmatter(slug: string): any {
  const filePath = path.join(process.cwd(), "content/pages", `${slug}.mdx`);
  const mdPath = path.join(process.cwd(), "content/pages", `${slug}.md`);
  
  let fullPath: string;
  if (fs.existsSync(filePath)) {
    fullPath = filePath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data;
  } catch (error) {
    return null;
  }
}

// 读取MDX文件内容（用于链接检查）
function getMDXContent(slug: string): string | null {
  const filePath = path.join(process.cwd(), "content/pages", `${slug}.mdx`);
  const mdPath = path.join(process.cwd(), "content/pages", `${slug}.md`);
  
  let fullPath: string;
  if (fs.existsSync(filePath)) {
    fullPath = filePath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);
    return content;
  } catch (error) {
    return null;
  }
}

// 判断是否为动态路由（包含[slug]、[...slug]、(group)等）
function isDynamicRoute(slug: string): boolean {
  // 检查是否包含动态段标记
  return /\[.*?\]|\(.*?\)|\.\.\./.test(slug);
}

// 获取所有路由slug
function getRouteSlugs(): string[] {
  const routesDir = path.join(process.cwd(), "app/zh");
  const slugs: string[] = [];
  
  function scanDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // 检查是否有page.tsx
        const pagePath = path.join(fullPath, "page.tsx");
        if (fs.existsSync(pagePath)) {
          const relativePath = path.relative(path.join(process.cwd(), "app/zh"), fullPath);
          slugs.push(relativePath);
        }
        // 递归扫描子目录
        scanDirectory(fullPath);
      }
    }
  }
  
  scanDirectory(routesDir);
  return slugs;
}

// 检查frontmatter必需字段
function checkFrontmatter(slug: string, frontmatter: any): string[] {
  const issues: string[] = [];
  
  if (!frontmatter.title || typeof frontmatter.title !== "string") {
    issues.push("缺少 title 或格式错误");
  }
  
  if (!frontmatter.description || typeof frontmatter.description !== "string") {
    issues.push("缺少 description 或格式错误");
  }
  
  const keywords = Array.isArray(frontmatter.keywords)
    ? frontmatter.keywords
    : frontmatter.keywords
    ? [frontmatter.keywords]
    : [];
  
  if (keywords.length < 8) {
    issues.push(`keywords 数量不足（当前：${keywords.length}，要求：>=8）`);
  }
  
  if (!frontmatter.country || typeof frontmatter.country !== "string") {
    issues.push("缺少 country");
  }
  
  if (!frontmatter.countrySlug || typeof frontmatter.countrySlug !== "string") {
    issues.push("缺少 countrySlug");
  }
  
  if (!frontmatter.serviceType || typeof frontmatter.serviceType !== "string") {
    issues.push("缺少 serviceType");
  }
  
  const faq = Array.isArray(frontmatter.faq) ? frontmatter.faq : [];
  if (faq.length < 3) {
    issues.push(`faq 数量不足（当前：${faq.length}，要求：>=3）`);
  }
  
  return issues;
}

// 检查canonical覆盖
function checkCanonical(slug: string): boolean {
  const pagePath = path.join(process.cwd(), "app/zh", slug, "page.tsx");
  
  if (!fs.existsSync(pagePath)) {
    return false;
  }
  
  try {
    const content = fs.readFileSync(pagePath, "utf8");
    // 检查是否调用了generateServiceMetadata
    return (
      content.includes("generateServiceMetadata") &&
      content.includes("from") &&
      (content.includes("@/lib/utils/metadata") || content.includes('"@/lib/utils/metadata"'))
    );
  } catch (error) {
    return false;
  }
}

// 提取MDX中的站内链接
function extractInternalLinks(content: string): string[] {
  const links: string[] = [];
  // 匹配markdown链接格式 [text](/zh/slug)
  const linkRegex = /\[([^\]]+)\]\(\/zh\/([^\)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const targetSlug = match[2].split("#")[0].split("?")[0]; // 移除锚点和查询参数
    if (targetSlug && !links.includes(targetSlug)) {
      links.push(targetSlug);
    }
  }
  
  return links;
}

// 检查链接是否有效
function isLinkValid(targetSlug: string): boolean {
  // 检查是否有对应的page.tsx
  const pagePath = path.join(process.cwd(), "app/zh", targetSlug, "page.tsx");
  if (fs.existsSync(pagePath)) {
    return true;
  }
  
  // 检查是否是特殊路由（如 /zh/markets, /zh/blog 等）
  const specialRoutes = ["markets", "about", "blog"];
  if (specialRoutes.includes(targetSlug)) {
    return true;
  }
  
  // 检查是否是国家主页面（如 /zh/brazil, /zh/philippines 等）
  const countryPages = ["brazil", "philippines", "indonesia", "india"];
  if (countryPages.includes(targetSlug)) {
    return true;
  }
  
  return false;
}

// 主函数
function main() {
  console.log("🔍 SEO Quality Gate Check Starting...\n");
  
  const result: AuditResult = {
    timestamp: new Date().toISOString(),
    mdxStats: {
      total: 0,
      slugs: [],
    },
    routeCoverage: {
      totalRoutes: 0,
      coveredRoutes: 0,
      missingMdx: [],
      orphanMdx: [],
    },
    frontmatterCheck: {
      total: 0,
      passed: 0,
      failed: [],
    },
    canonicalCoverage: {
      total: 0,
      covered: 0,
      coverageRate: 0,
      missing: [],
    },
    deadLinks: [],
    similarity: {
      titles: [],
      descriptions: [],
    },
  };
  
  // 1. 统计MDX文件
  console.log("📊 1. 统计MDX文件...");
  const mdxSlugs = getMDXFiles("content/pages");
  result.mdxStats.total = mdxSlugs.length;
  result.mdxStats.slugs = mdxSlugs;
  console.log(`   ✓ 共找到 ${mdxSlugs.length} 个MDX文件\n`);
  
  // 2. 检查路由与MDX对应关系
  console.log("🔄 2. 检查路由与MDX对应关系...");
  const routeSlugs = getRouteSlugs();
  result.routeCoverage.totalRoutes = routeSlugs.length;
  
  const routeSlugSet = new Set(routeSlugs);
  const mdxSlugSet = new Set(mdxSlugs);
  
  for (const routeSlug of routeSlugs) {
    if (mdxSlugSet.has(routeSlug)) {
      result.routeCoverage.coveredRoutes++;
    } else {
      // 允许特殊路由（markets, about, blog等）
      const specialRoutes = ["markets", "about", "blog"];
      if (!specialRoutes.includes(routeSlug)) {
        result.routeCoverage.missingMdx.push(routeSlug);
      }
    }
  }
  
  for (const mdxSlug of mdxSlugs) {
    if (!routeSlugSet.has(mdxSlug)) {
      result.routeCoverage.orphanMdx.push(mdxSlug);
    }
  }
  
  console.log(`   ✓ 路由总数: ${routeSlugs.length}`);
  console.log(`   ✓ 已覆盖路由: ${result.routeCoverage.coveredRoutes}`);
  if (result.routeCoverage.missingMdx.length > 0) {
    console.log(`   ⚠ 缺少MDX的路由: ${result.routeCoverage.missingMdx.length} 个`);
  }
  if (result.routeCoverage.orphanMdx.length > 0) {
    console.log(`   ⚠ 孤立MDX文件: ${result.routeCoverage.orphanMdx.length} 个\n`);
  } else {
    console.log(`   ✓ 无孤立MDX文件\n`);
  }
  
  // 3. 检查frontmatter必需字段
  console.log("✅ 3. 检查frontmatter必需字段...");
  result.frontmatterCheck.total = mdxSlugs.length;
  
  for (const slug of mdxSlugs) {
    const frontmatter = getMDXFrontmatter(slug);
    if (!frontmatter) {
      result.frontmatterCheck.failed.push({
        slug,
        issues: ["无法读取frontmatter"],
      });
      continue;
    }
    
    const issues = checkFrontmatter(slug, frontmatter);
    if (issues.length === 0) {
      result.frontmatterCheck.passed++;
    } else {
      result.frontmatterCheck.failed.push({
        slug,
        issues,
      });
    }
  }
  
  console.log(`   ✓ 通过: ${result.frontmatterCheck.passed}/${result.frontmatterCheck.total}`);
  if (result.frontmatterCheck.failed.length > 0) {
    console.log(`   ✗ 失败: ${result.frontmatterCheck.failed.length} 个文件\n`);
  } else {
    console.log(`   ✓ 所有文件frontmatter完整\n`);
  }
  
  // 4. 检查canonical覆盖（只统计静态路由）
  console.log("🔗 4. 检查canonical覆盖...");
  // 排除动态路由和特殊路由
  const staticPageRoutes = routeSlugs.filter(
    (slug) => 
      !["markets", "about", "blog"].includes(slug) &&
      !isDynamicRoute(slug)
  );
  
  const excludedDynamicRoutes = routeSlugs.filter(
    (slug) => isDynamicRoute(slug) && !["markets", "about", "blog"].includes(slug)
  );
  
  result.canonicalCoverage.excludedDynamicRoutes = excludedDynamicRoutes;
  result.canonicalCoverage.total = staticPageRoutes.length;
  
  for (const slug of staticPageRoutes) {
    if (checkCanonical(slug)) {
      result.canonicalCoverage.covered++;
    } else {
      result.canonicalCoverage.missing.push(slug);
    }
  }
  
  result.canonicalCoverage.coverageRate =
    result.canonicalCoverage.total > 0
      ? (result.canonicalCoverage.covered / result.canonicalCoverage.total) * 100
      : 0;
  
  console.log(`   ✓ 覆盖率: ${result.canonicalCoverage.coverageRate.toFixed(1)}% (${result.canonicalCoverage.covered}/${result.canonicalCoverage.total})`);
  if (excludedDynamicRoutes.length > 0) {
    console.log(`   ℹ 已排除动态路由: ${excludedDynamicRoutes.join(", ")}`);
  }
  if (result.canonicalCoverage.missing.length > 0) {
    console.log(`   ⚠ 缺少canonical: ${result.canonicalCoverage.missing.length} 个路由\n`);
  } else {
    console.log(`   ✓ 所有静态路由都有canonical\n`);
  }
  
  // 5. 检查站内链接死链
  console.log("🔗 5. 检查站内链接死链...");
  const deadLinksMap = new Map<string, string[]>();
  
  for (const slug of mdxSlugs) {
    const content = getMDXContent(slug);
    if (!content) {
      continue;
    }
    
    const links = extractInternalLinks(content);
    const deadLinks: string[] = [];
    
    for (const link of links) {
      if (!isLinkValid(link)) {
        deadLinks.push(link);
      }
    }
    
    if (deadLinks.length > 0) {
      deadLinksMap.set(slug, deadLinks);
      result.deadLinks.push({
        slug,
        links: deadLinks.map((target) => ({ target })),
      });
    }
  }
  
  console.log(`   ✓ 检查了 ${mdxSlugs.length} 个文件`);
  if (result.deadLinks.length > 0) {
    console.log(`   ⚠ 发现死链: ${result.deadLinks.length} 个文件包含死链\n`);
  } else {
    console.log(`   ✓ 未发现死链\n`);
  }
  
  // 6. Title/Description相似度报告
  console.log("📊 6. 计算Title/Description相似度...");
  const titles: Array<{ slug: string; title: string }> = [];
  const descriptions: Array<{ slug: string; description: string }> = [];
  
  for (const slug of mdxSlugs) {
    const frontmatter = getMDXFrontmatter(slug);
    if (frontmatter) {
      if (frontmatter.title) {
        titles.push({ slug, title: frontmatter.title });
      }
      if (frontmatter.description) {
        descriptions.push({ slug, description: frontmatter.description });
      }
    }
  }
  
  // 计算title相似度
  const exactDuplicates: Array<{ slug1: string; slug2: string; title: string }> = [];
  const highSimilarity: Array<{ slug1: string; slug2: string; similarity: number; title1: string; title2: string }> = [];
  
  for (let i = 0; i < titles.length; i++) {
    for (let j = i + 1; j < titles.length; j++) {
      const normalized1 = normalizeTitle(titles[i].title);
      const normalized2 = normalizeTitle(titles[j].title);
      
      // 完全相等判断
      if (normalized1 === normalized2) {
        exactDuplicates.push({
          slug1: titles[i].slug,
          slug2: titles[j].slug,
          title: titles[i].title,
        });
        // 完全相等的记录为1.00
        result.similarity.titles.push({
          slug1: titles[i].slug,
          slug2: titles[j].slug,
          similarity: 1.00,
          title1: titles[i].title,
          title2: titles[j].title,
        });
      } else {
        // 高相似度（但不完全相等）用于警告
        const similarity = calculateSimilarity(titles[i].title, titles[j].title);
        if (similarity > 0.5) {
          highSimilarity.push({
            slug1: titles[i].slug,
            slug2: titles[j].slug,
            similarity: Math.round(similarity * 100) / 100,
            title1: titles[i].title,
            title2: titles[j].title,
          });
          // 高相似度但不完全相等的，相似度设为0.99（表示接近但不等于1.00）
          result.similarity.titles.push({
            slug1: titles[i].slug,
            slug2: titles[j].slug,
            similarity: Math.min(0.99, Math.round(similarity * 100) / 100),
            title1: titles[i].title,
            title2: titles[j].title,
          });
        }
      }
    }
  }
  
  // 存储完全相等的title对（用于报告）
  (result as any).exactDuplicateTitles = exactDuplicates;
  
  // 计算description相似度
  for (let i = 0; i < descriptions.length; i++) {
    for (let j = i + 1; j < descriptions.length; j++) {
      const similarity = calculateSimilarity(
        descriptions[i].description,
        descriptions[j].description
      );
      if (similarity > 0.5) {
        // 只记录相似度>50%的
        result.similarity.descriptions.push({
          slug1: descriptions[i].slug,
          slug2: descriptions[j].slug,
          similarity: Math.round(similarity * 100) / 100,
          desc1: descriptions[i].description,
          desc2: descriptions[j].description,
        });
      }
    }
  }
  
  // 排序：相似度从高到低
  result.similarity.titles.sort((a, b) => b.similarity - a.similarity);
  result.similarity.descriptions.sort((a, b) => b.similarity - a.similarity);
  
  // 只保留Top 30
  result.similarity.titles = result.similarity.titles.slice(0, 30);
  result.similarity.descriptions = result.similarity.descriptions.slice(0, 30);
  
  console.log(`   ✓ 完全相等Title: ${exactDuplicates.length} 对`);
  console.log(`   ✓ 高相似Title (相似度>50%): ${highSimilarity.length} 对`);
  console.log(`   ✓ Description相似度对: ${result.similarity.descriptions.length} 对\n`);
  
  // 输出报告摘要
  console.log("=" .repeat(60));
  console.log("📋 SEO质量门禁检查报告摘要");
  console.log("=" .repeat(60));
  console.log(`\n✅ MDX文件统计: ${result.mdxStats.total} 个`);
  console.log(
    `✅ 路由覆盖: ${result.routeCoverage.coveredRoutes}/${result.routeCoverage.totalRoutes}`
  );
  console.log(
    `✅ Frontmatter完整性: ${result.frontmatterCheck.passed}/${result.frontmatterCheck.total}`
  );
  console.log(
    `✅ Canonical覆盖率: ${result.canonicalCoverage.coverageRate.toFixed(1)}%`
  );
  console.log(`✅ 死链检查: ${result.deadLinks.length} 个文件包含死链`);
  
  const exactDuplicateCount = exactDuplicates.length;
  console.log(`✅ 完全相等Title: ${exactDuplicateCount} 对`);
  
  // 输出详细问题（如果有）
  if (result.frontmatterCheck.failed.length > 0) {
    console.log("\n⚠️ Frontmatter问题文件:");
    result.frontmatterCheck.failed.slice(0, 5).forEach((item) => {
      console.log(`   - ${item.slug}: ${item.issues.join(", ")}`);
    });
    if (result.frontmatterCheck.failed.length > 5) {
      console.log(`   ... 还有 ${result.frontmatterCheck.failed.length - 5} 个文件`);
    }
  }
  
  if (result.deadLinks.length > 0) {
    console.log("\n⚠️ 死链问题文件 (前5个):");
    result.deadLinks.slice(0, 5).forEach((item) => {
      console.log(`   - ${item.slug}: ${item.links.map((l) => l.target).join(", ")}`);
    });
    if (result.deadLinks.length > 5) {
      console.log(`   ... 还有 ${result.deadLinks.length - 5} 个文件`);
    }
  }
  
  if (exactDuplicateCount > 0) {
    console.log("\n⚠️ 完全相等Title (必须修复):");
    exactDuplicates.slice(0, 10).forEach((item: any) => {
      console.log(`   - ${item.slug1} <-> ${item.slug2}`);
      console.log(`     Title: "${item.title}"`);
    });
    if (exactDuplicateCount > 10) {
      console.log(`   ... 还有 ${exactDuplicateCount - 10} 对`);
    }
  }
  
  // 高相似度警告（但不完全相等）
  const highSimilarTitles = result.similarity.titles.filter(t => t.similarity < 1.00 && t.similarity >= 0.5);
  if (highSimilarTitles.length > 0) {
    console.log("\n⚠️ 高相似Title (相似度>=50%，建议检查):");
    highSimilarTitles.slice(0, 5).forEach((item) => {
      console.log(`   ${item.similarity.toFixed(2)}: ${item.slug1} <-> ${item.slug2}`);
    });
    if (highSimilarTitles.length > 5) {
      console.log(`   ... 还有 ${highSimilarTitles.length - 5} 对`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  
  // 保存JSON报告
  const reportsDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, "seo-audit.json");
  fs.writeFileSync(reportPath, JSON.stringify(result, null, 2), "utf8");
  console.log(`\n💾 详细报告已保存至: ${reportPath}\n`);
  
  // 返回退出码（如果有严重问题）
  const hasCriticalIssues =
    result.frontmatterCheck.failed.length > 10 ||
    result.canonicalCoverage.coverageRate < 80 ||
    result.deadLinks.length > 20;
  
  process.exit(hasCriticalIssues ? 1 : 0);
}

main();
