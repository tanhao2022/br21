# BR21 - 老虎机代投服务网站

专业的slot类项目广告投放服务网站，专注巴西市场，面向中文客户。

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **渲染**: SSG (Static Site Generation)
- **内容**: MDX + 本地文件
- **部署**: Vercel / Cloudflare Pages

## 项目结构

```
/app
├── layout.tsx          # 根布局
├── page.tsx            # 首页（重定向到/zh）
├── sitemap.ts          # Sitemap生成
├── robots.ts           # Robots.txt生成
└── zh/                 # 中文路由
    ├── layout.tsx      # 中文布局
    ├── page.tsx        # 中文首页
    ├── slot-ditou/
    ├── laohuji-ditou/
    ├── brazil-slot-ditou/
    └── about/

/components              # React组件
├── QuickAnswer.tsx
├── KeyPoints.tsx
├── RiskNotes.tsx
├── ProcessFlow.tsx
├── FAQ.tsx
├── CTA.tsx
├── SEO.tsx
└── ArticleLayout.tsx

/content                 # MDX内容文件
├── pages/
├── guides/
└── risks/

/lib/utils               # 工具函数
└── mdx.ts              # MDX内容读取
```

## SEO特性

- ✅ 每页唯一的 `<title>` 和 `<meta description>`
- ✅ OpenGraph 和 Twitter Card 支持
- ✅ JSON-LD (Schema.org) 结构化数据
- ✅ 自动生成 Sitemap 和 Robots.txt
- ✅ 清晰的Heading层级（H1 → H2 → H3）

## 内容组件

所有页面支持以下AI搜索友好的内容模块：

- `<QuickAnswer />` - 快速解答（100-150字）
- `<KeyPoints />` - 核心要点
- `<ProcessFlow />` - 操作流程
- `<RiskNotes />` - 风险提示
- `<FAQ />` - 常见问题
- `<CTA />` - 行动号召

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 启动生产服务器
npm start
```

## 内容管理

所有页面内容从 `/content` 目录的 MDX 文件读取。MDX 文件支持 front matter：

```yaml
---
title: "页面标题"
description: "页面描述"
keywords: "关键词1,关键词2"
quickAnswer: "快速解答内容..."
keyPoints:
  - "要点1"
  - "要点2"
process:
  - title: "步骤标题"
    description: "步骤描述"
risks:
  - "风险1"
faq:
  - question: "问题"
    answer: "答案"
---
```

## 部署

项目配置为静态导出，支持部署到：

- Vercel
- Cloudflare Pages
- 任何静态托管服务

构建后的文件在 `.next` 目录中。

## 注意事项

- 所有页面使用SSG，确保SEO友好
- MDX内容必须包含必要的front matter
- 移动端优先设计
- 遵循Tailwind CSS最佳实践

## 许可证

私有项目