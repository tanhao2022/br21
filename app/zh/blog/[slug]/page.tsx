import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getMDXContent, getMDXFiles } from "@/lib/utils/mdx";
import { generateFAQSchema } from "@/components/SEO";

// 保留硬编码内容作为后备（如果 MDX 文件不存在）
const blogContent: Record<string, { title: string; content: string; date: string; category: string }> = {
  "2026-brazil-igaming-payment-report": {
    title: "2026 巴西 iGaming 支付报告：PIX 成功率分析",
    date: "2026-01-22",
    category: "市场趋势",
    content: `# 2026 巴西 iGaming 支付报告：PIX 成功率分析

## 执行摘要

根据 BR21 团队 2025 年 Q4 至 2026 年 Q1 的投放数据，巴西 iGaming 市场 PIX 支付成功率呈现显著波动。本文基于超过 **$500 万** 的广告消耗数据，深度分析 PIX 支付失败的根本原因，并提供可落地的优化方案。

## 核心发现

### 1. PIX 支付失败率高达 23%

在分析的 12,000+ 笔交易中，PIX 支付失败率平均为 **23%**，远高于行业预期的 15%。主要失败原因包括：

- **网络延迟**：占失败总数的 42%
- **银行风控拦截**：占失败总数的 31%
- **用户操作错误**：占失败总数的 18%
- **技术对接问题**：占失败总数的 9%

### 2. 时段差异显著

PIX 支付成功率在不同时段存在明显差异：

- **工作日 10:00-14:00**：成功率 85%（高峰期）
- **工作日 18:00-22:00**：成功率 72%（低峰期）
- **周末全天**：成功率 78%（中等）

### 3. 银行差异分析

不同银行的 PIX 支付成功率差异较大：

| 银行 | 成功率 | 平均处理时间 |
|------|--------|-------------|
| Nubank | 89% | 2.3秒 |
| Banco do Brasil | 82% | 3.1秒 |
| Itaú | 79% | 3.5秒 |
| Bradesco | 76% | 4.2秒 |

## 优化方案

### 方案一：多银行分流策略

通过智能路由系统，将用户引导至成功率更高的银行渠道。实测可将整体成功率提升 **12%**。

### 方案二：支付页面优化

- 减少页面加载时间至 1.5 秒以内
- 添加支付进度可视化
- 优化移动端体验

### 方案三：重试机制

对于失败交易，自动触发重试机制，最多重试 3 次，间隔 30 秒。

## 结论

PIX 支付优化是巴西 iGaming 市场 ROI 提升的关键环节。通过技术优化和策略调整，可将整体支付成功率提升至 **90%+**，显著改善用户转化漏斗。

---

*本报告基于 BR21 团队真实投放数据，如需完整数据报告，请联系我们的专业团队。*`,
  },
  "facebook-cloaking-3-0-solution": {
    title: "Facebook Cloaking 3.0：iGaming 广告防封技术详解",
    date: "2026-01-20",
    category: "技术方案",
    content: `# Facebook Cloaking 3.0：iGaming 广告防封技术详解

## 什么是 Cloaking？

Cloaking（斗篷技术）是一种广告审核规避技术，通过识别访问者的身份（真实用户 vs. 审核爬虫），展示不同的内容，从而通过平台审核。

## Cloaking 3.0 核心技术

### 1. IP 指纹识别

通过分析访问者的 IP 地址、User-Agent、设备指纹等多维度数据，精准识别 Facebook 审核爬虫。

**识别准确率**：99.7%

### 2. 动态域名轮询

当检测到域名被标记或封禁时，系统自动切换到备用域名，确保广告链接 24 小时畅通。

**切换时间**：< 0.5 秒

### 3. Safe Page 策略

为审核爬虫展示完全合规的"安全页"，如游戏攻略、新闻资讯等，确保 100% 过审。

## 技术架构

\`\`\`
用户点击广告
    ↓
Cloaking 系统分析访问者指纹
    ↓
判断：真实用户 or 审核爬虫？
    ↓
真实用户 → 展示落地页（Money Page）
审核爬虫 → 展示安全页（Safe Page）
\`\`\`

## 实施建议

1. **使用企业级 Cloaking 服务**：自建成本高，维护难度大
2. **定期更新 IP 库**：审核爬虫 IP 库需要实时更新
3. **A/B 测试 Safe Page**：不同 Safe Page 的过审率存在差异

## 风险提示

Cloaking 技术存在一定风险，建议：

- 仅用于合规灰色地带项目
- 配合高质量账户资源使用
- 定期监控账户健康度

---

*BR21 提供企业级 Cloaking 解决方案，如需技术咨询，请联系我们的技术团队。*`,
  },
  "india-rummy-uac-case-study": {
    title: "印度 Rummy 案例：如何通过 UAC 2.5 实现 500% ROI",
    date: "2026-01-18",
    category: "成功案例",
    content: `# 印度 Rummy 案例：如何通过 UAC 2.5 实现 500% ROI

## 客户背景

**产品类型**：印度 Rummy 真金游戏  
**目标市场**：印度全境  
**初始状态**：日耗 $5K，ROI 120%，无法扩量

## 挑战分析

### 问题 1：UAC 安装量质量差

初始使用 UAC Install 优化，虽然 CPI 低（$0.8），但用户质量极差：
- 注册率：仅 35%
- 首充率：仅 8%
- Day-3 留存：仅 12%

### 问题 2：无法规模化

尝试扩量时，ROI 迅速下降，无法突破 $10K/日瓶颈。

## 解决方案

### 阶段一：切换到 UAC 2.5 事件优化

将优化目标从 Install 改为 **AddCash（充值）事件**：

- CPI 提升至 $2.5
- 但注册率提升至 68%
- 首充率提升至 24%

### 阶段二：深度事件回传

对接 AppsFlyer，回传以下事件：
- \`af_purchase\`（充值）
- \`af_revenue\`（收入）
- \`af_roas\`（广告支出回报率）

### 阶段三：素材本地化

- 使用印地语真人素材
- 强调"提现到账"真实案例
- CTR 提升 40%

## 成果数据

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 日消耗 | $5K | $50K | 10x |
| ROI | 120% | 500% | 4.2x |
| 注册率 | 35% | 68% | 94% |
| 首充率 | 8% | 24% | 200% |
| Day-3 留存 | 12% | 35% | 192% |

## 关键成功因素

1. **事件优化策略**：从 Install 到 AddCash 的转变是关键
2. **数据回传完整性**：完整的事件回传让 Google 算法更精准
3. **素材本地化**：真人素材大幅提升转化率

## 经验总结

- UAC 2.5 适合有明确转化事件的 iGaming 产品
- 深度事件回传是规模化扩量的前提
- 本地化素材是提升 ROI 的核心

---

*本案例基于真实客户数据，如需类似方案，请联系 BR21 专业团队。*`,
  },
};

// 生成静态参数（用于静态导出）
export async function generateStaticParams() {
  // 优先从 MDX 文件读取
  const mdxFiles = getMDXFiles("blog");
  const mdxSlugs = mdxFiles.map((file) => file.replace(/\.(mdx|md)$/, ""));
  
  // 合并硬编码的 slug（作为后备）
  const hardcodedSlugs = Object.keys(blogContent);
  
  // 合并并去重
  const allSlugs = [...new Set([...mdxSlugs, ...hardcodedSlugs])];
  
  return allSlugs.map((slug) => ({
    slug,
  }));
}

// 生成目录的函数
function generateTOC(content: string): Array<{ id: string; text: string; level: number }> {
  const lines = content.split("\n");
  const toc: Array<{ id: string; text: string; level: number }> = [];

  lines.forEach((line) => {
    if (line.startsWith("#")) {
      const level = line.match(/^#+/)?.[0].length || 0;
      if (level <= 3) {
        const text = line.replace(/^#+\s+/, "");
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        toc.push({ id, text, level });
      }
    }
  });

  return toc;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // 优先从 MDX 读取
  const mdxData = getMDXContent("blog", slug);
  if (mdxData) {
    return {
      title: mdxData.frontMatter.title,
      description: `${mdxData.frontMatter.title} - BR21 行业洞察`,
    };
  }
  // 后备：使用硬编码数据
  const post = blogContent[slug];
  if (!post) {
    return {
      title: "文章未找到",
    };
  }
  return {
    title: post.title,
    description: `${post.title} - BR21 行业洞察`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 优先从 MDX 读取
  const mdxData = getMDXContent("blog", slug);
  let post: { title: string; content: string; date: string; category: string } | null = null;
  let faqSchema = null;

  if (mdxData) {
    post = {
      title: mdxData.frontMatter.title,
      content: mdxData.content,
      date: mdxData.frontMatter.date || new Date().toISOString(),
      category: mdxData.frontMatter.category || "未分类",
    };
    // 生成 FAQ Schema（如果存在）
    if (mdxData.frontMatter.faq && mdxData.frontMatter.faq.length > 0) {
      faqSchema = generateFAQSchema(mdxData.frontMatter.faq);
    }
  } else {
    // 后备：使用硬编码数据
    post = blogContent[slug] || null;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p>文章未找到</p>
        <Link href="/zh/blog" className="text-blue-600 hover:underline">
          返回博客列表
        </Link>
      </div>
    );
  }

  const toc = generateTOC(post.content);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
        <div className="mb-8">
          <Link
            href="/zh/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" />
            返回博客列表
          </Link>
        </div>

        <div className="flex gap-8">
          {/* 主内容区 */}
          <article className="flex-1">
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => {
                  const id = props.children
                    ?.toString()
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                  return <h2 id={id} className="scroll-mt-20" {...props} />;
                },
                h3: ({ node, ...props }) => {
                  const id = props.children
                    ?.toString()
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                  return <h3 id={id} className="scroll-mt-20" {...props} />;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 相关服务 CTA */}
          <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              相关服务
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              需要专业的 iGaming 广告投放服务？BR21 团队为您提供一站式解决方案。
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/zh/brazil-slot-ditou"
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  巴西老虎机代投
                </span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                href="/zh/india-rummy-uac"
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  印度 Rummy 投放
                </span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                href="/zh/markets"
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  查看所有市场
                </span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                href="https://t.me/youfa8577"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-blue-500 bg-blue-50 p-4 transition-all hover:bg-blue-100 dark:border-blue-400 dark:bg-blue-900/20"
              >
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  立即咨询专家
                </span>
                <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </Link>
            </div>
          </div>
        </article>

        {/* 目录（右侧固定） */}
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 w-64 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                目录
              </h3>
              <nav className="space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 ${
                      item.level === 1
                        ? "font-medium"
                        : item.level === 2
                          ? "ml-4"
                          : "ml-8"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
