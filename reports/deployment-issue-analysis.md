# 线上部署问题分析报告

## 问题现象
- **本地构建**: sitemap.xml 有 120 个 URL（5个静态路由 + 107个pages + 8个blog）
- **线上部署**: sitemap.xml 只有 23 个 URL（仅包含静态路由）
- **关键URL**: 10个关键URL中有8个返回404

## 根因分析

### 1. 配置检查结果
- ✅ `.gitignore` 未忽略 `content/` 目录
- ✅ `content/pages/` 目录有 107 个 MDX 文件，全部在 git 中
- ✅ 本地构建正常，`getMDXFiles("pages")` 返回 107 个文件
- ❌ 线上构建时 `getMDXFiles("pages")` 返回空数组

### 2. 问题定位
**根因：Next.js 静态导出模式下，`sitemap.ts` 在构建时运行，但部署平台可能：**
1. **工作目录不同**：`process.cwd()` 在构建时指向不同路径
2. **文件未包含**：部署平台可能未将 `content/` 目录包含到构建上下文
3. **路径解析失败**：相对路径 `path.join(process.cwd(), "content")` 在构建时解析错误

### 3. 技术细节
- `next.config.ts` 使用 `output: "export"`（静态导出）
- `sitemap.ts` 使用 `export const dynamic = "force-static"`（构建时执行）
- `lib/utils/mdx.ts` 使用 `path.join(process.cwd(), "content")` 读取文件

## 修复方案

### 方案A：增强路径解析（推荐）
在 `lib/utils/mdx.ts` 中添加路径解析容错，支持多种路径解析方式。

### 方案B：添加构建时验证
在 `sitemap.ts` 中添加调试日志，确保构建时能读取到文件。

### 方案C：使用绝对路径
使用 `__dirname` 或 `import.meta.url` 获取绝对路径（但 Next.js 可能不支持）。

## 推荐修复
采用**方案A + 方案B**组合：
1. 增强 `lib/utils/mdx.ts` 的路径解析
2. 在 `sitemap.ts` 中添加构建时验证和错误处理
3. 确保部署平台包含 `content/` 目录
