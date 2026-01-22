# 部署指南

## 当前状态
- ✅ 代码已推送到 GitHub: `https://github.com/tanhao2022/br21.git`
- ✅ 最新提交: `422b280 - fix: 修复 Google Search Console sitemap 404 错误`
- ✅ 构建输出: `out/` 目录包含所有静态文件

## 部署选项

### 方式 1: Vercel（推荐 - 自动部署）

**如果已连接 Vercel：**
1. 代码已推送到 GitHub，Vercel 会自动检测并部署
2. 访问 Vercel Dashboard 查看部署状态
3. 部署完成后，访问生产 URL 验证 sitemap

**如果未连接 Vercel：**
1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 导入项目 `tanhao2022/br21`
4. 配置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`
5. 点击 Deploy

### 方式 2: Cloudflare Pages

1. 访问 https://pages.cloudflare.com
2. 连接 GitHub 账号
3. 选择仓库 `tanhao2022/br21`
4. 配置：
   - Framework preset: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Build output directory: `out`
5. 点击 Save and Deploy

### 方式 3: GitHub Pages

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 Source: GitHub Actions
3. 创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

### 方式 4: 手动部署到静态托管

如果使用其他静态托管服务（如 Netlify、AWS S3、阿里云 OSS 等）：

1. 构建项目：
```bash
npm run build
```

2. 上传 `out/` 目录中的所有文件到托管服务

3. 确保：
   - 根目录包含 `index.html`
   - `sitemap.xml` 在根目录
   - `robots.txt` 在根目录

## 部署后验证

### 1. 检查 sitemap 可访问性
```bash
# 访问生产环境的 sitemap
curl https://www.br21.com/sitemap.xml
```

### 2. 验证 sitemap 内容
- 确认包含 116 个 URL
- 检查所有 URL 格式正确
- 验证优先级和更新频率设置

### 3. Google Search Console
1. 等待部署完成（通常 1-5 分钟）
2. 访问 Google Search Console
3. 在"站点地图"部分：
   - 如果之前提交的 sitemap 仍然显示错误，点击"重新抓取"
   - 或删除旧的 sitemap，重新提交 `https://www.br21.com/sitemap.xml`
4. 等待 Google 抓取（通常 24-48 小时）

### 4. 验证关键页面
- 首页: `https://www.br21.com/`
- 中文首页: `https://www.br21.com/zh/`
- 博客页面: `https://www.br21.com/zh/blog/`
- HTML Sitemap: `https://www.br21.com/zh/sitemap/`

## 故障排查

### 如果 sitemap 仍然返回 404：
1. 检查部署配置中的输出目录是否为 `out`
2. 确认 `sitemap.xml` 文件在构建输出中
3. 检查服务器配置，确保 `.xml` 文件可以被访问

### 如果 Google Search Console 仍然报错：
1. 等待 24-48 小时让 Google 重新抓取
2. 使用"网址检查工具"测试 sitemap URL
3. 确认 robots.txt 中引用的 sitemap URL 正确

## 当前构建信息

- **构建命令**: `npm run build`
- **输出目录**: `out/`
- **Sitemap 文件**: `out/sitemap.xml`
- **包含 URL 数量**: 116
- **构建时间**: 2026-01-22
