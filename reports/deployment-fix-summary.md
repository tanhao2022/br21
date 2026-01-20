# 部署问题修复方案

## 问题诊断

### 现象
- **本地构建**：sitemap.xml 包含 120 个 URL（107 个服务页 + 8 个博客 + 5 个静态路由）
- **线上部署**：sitemap.xml 只有 23 个 URL（仅 5 个静态路由 + 8 个博客，缺少 107 个服务页）
- **关键URL 404**：10 个关键 URL 中有 8 个返回 404

### 根因分析

**核心问题**：`lib/utils/mdx.ts` 中的 `getContentDirectory()` 函数在模块加载时被调用并缓存结果，导致在部署环境的构建阶段无法正确解析 `content/` 目录路径。

**具体原因**：
1. **路径解析缓存问题**：`const contentDirectory = getContentDirectory();` 在模块加载时执行，此时工作目录可能不正确
2. **部署环境差异**：Vercel/Cloudflare Pages 等平台的工作目录可能与本地不同
3. **构建时路径解析失败**：`sitemap.ts` 在构建时调用 `getMDXFiles("pages")`，但此时 `contentDirectory` 可能指向错误路径

## 修复方案

### 修改文件清单

1. **`lib/utils/mdx.ts`**
   - 移除模块级 `contentDirectory` 缓存
   - 将 `getContentDirectory()` 改为每次调用时动态解析
   - 增强路径解析逻辑，添加更多回退路径
   - 添加详细的构建时诊断日志

2. **`app/sitemap.ts`**
   - 增强构建时诊断信息
   - 添加文件数量异常警告
   - 输出详细的工作目录和路径信息

### 修复内容

#### 1. `lib/utils/mdx.ts` 修复

**问题代码**：
```typescript
const contentDirectory = getContentDirectory(); // 模块加载时缓存

export function getMDXFiles(directory: string): string[] {
  const dirPath = path.join(contentDirectory, directory); // 使用缓存的路径
  // ...
}
```

**修复后**：
```typescript
// 移除模块级缓存，改为每次调用时动态解析
export function getMDXFiles(directory: string): string[] {
  const contentDir = getContentDirectory(); // 每次调用时动态获取
  const dirPath = path.join(contentDir, directory);
  // ...
}
```

**增强的路径解析**：
- 添加了更多回退路径
- 添加了详细的错误日志
- 在构建时输出诊断信息

#### 2. `app/sitemap.ts` 增强诊断

- 添加了详细的构建时诊断输出
- 检查文件数量异常（< 50 个服务文件时警告）
- 输出工作目录和路径信息

## 验证方法

### 本地验证

```bash
# 1. 清理构建缓存
rm -rf .next out

# 2. 重新构建
npm run build

# 3. 检查构建日志
npm run build 2>&1 | grep -E "\[sitemap\]|\[mdx\]"

# 4. 验证 sitemap.xml
cat out/sitemap.xml | grep -c "<url>"  # 应该输出 120

# 5. 检查关键URL是否生成
ls -la out/zh/brazil/ out/zh/philippines/ out/zh/indonesia/ out/zh/india/
```

### 部署后验证

```bash
# 1. 运行上线后排雷检查
BASE_URL=https://www.br21.com npm run postdeploy-audit

# 2. 检查 sitemap.xml URL 数量
curl -s https://www.br21.com/sitemap.xml | grep -c "<url>"  # 应该 >= 100

# 3. 检查关键URL
curl -I https://www.br21.com/zh/brazil
curl -I https://www.br21.com/zh/philippines
curl -I https://www.br21.com/zh/indonesia
curl -I https://www.br21.com/zh/india
```

## 预期结果

修复后，线上部署应该：
- ✅ sitemap.xml 包含 120 个 URL（107 个服务页 + 8 个博客 + 5 个静态路由）
- ✅ 所有关键 URL 返回 200 状态码
- ✅ `postdeploy-audit` 检查全部通过

## 如果问题仍然存在

如果修复后问题仍然存在，请检查：

1. **部署平台配置**
   - 检查 Vercel/Cloudflare Pages 的工作目录设置
   - 确认 `content/` 目录是否被 `.gitignore` 或部署平台忽略文件排除

2. **构建日志**
   - 查看部署平台的构建日志
   - 查找 `[sitemap]` 和 `[mdx]` 相关的诊断信息
   - 确认 `content/` 目录路径是否正确解析

3. **文件系统权限**
   - 确认部署环境有读取 `content/` 目录的权限

4. **Git 提交**
   - 确认所有 `content/pages/*.mdx` 文件都已提交到 Git
   - 运行 `git ls-files content/pages/ | wc -l` 确认文件数量
