#!/usr/bin/env node
/**
 * Pre-Flight Build Audit Script
 * 
 * 验证 generateStaticParams 和动态路由是否正常工作
 * 检查页面是否返回 200、内容是否完整、SEO 元素是否正确
 * 
 * 检查项：
 * 1. Status Code === 200
 * 2. <title> 标签不为空
 * 3. <h1> 标签存在且包含国家名称
 * 4. 内容长度 > 500 字符
 * 5. 特定术语存在（如 Brazil 页面包含 "PIX"）
 */

import fs from "fs";
import path from "path";
import { marketServiceMatrix } from "../lib/seo-matrix";

interface AuditResult {
  timestamp: string;
  baseUrl: string;
  totalUrls: number;
  passed: number;
  failed: number;
  results: Array<{
    url: string;
    status: "PASS" | "FAIL";
    statusCode?: number;
    checks: {
      statusCode: { passed: boolean; message: string };
      title: { passed: boolean; message: string };
      h1: { passed: boolean; message: string };
      contentLength: { passed: boolean; message: string };
      specificTerms: { passed: boolean; message: string };
    };
    errors?: string[];
  }>;
  summary: {
    statusCodePassRate: number;
    titlePassRate: number;
    h1PassRate: number;
    contentLengthPassRate: number;
    specificTermsPassRate: number;
  };
}

// ANSI 颜色代码
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

/**
 * 生成随机 URL 样本
 * 从 marketServiceMatrix 生成 50 个 URL
 */
function generateSampleUrls(count: number = 50): string[] {
  const { markets, services, features } = marketServiceMatrix;
  const urls: string[] = [];

  // 生成所有可能的组合
  const allCombinations: Array<{
    market: string;
    service: string;
    feature: string;
  }> = [];

  for (const market of markets) {
    for (const service of services) {
      for (const feature of features) {
        allCombinations.push({
          market: market.slug,
          service: service.slug,
          feature: feature.slug,
        });
      }
    }
  }

  // 随机选择指定数量的组合
  const selected: Array<typeof allCombinations[0]> = [];
  const usedIndices = new Set<number>();

  while (selected.length < count && selected.length < allCombinations.length) {
    const randomIndex = Math.floor(Math.random() * allCombinations.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      selected.push(allCombinations[randomIndex]);
    }
  }

  // 生成 URL
  for (const combo of selected) {
    urls.push(`/zh/${combo.market}/${combo.service}/${combo.feature}/`);
  }

  return urls;
}

/**
 * 获取市场特定的验证术语
 */
function getMarketSpecificTerms(marketSlug: string): string[] {
  const market = marketServiceMatrix.markets.find((m) => m.slug === marketSlug);
  if (!market) return [];

  const terms: string[] = [];

  // 添加主要支付方式
  if (market.paymentMethods.length > 0) {
    terms.push(market.paymentMethods[0]);
  }

  // 添加本地关键词（前2个）
  if (market.localKeywords.length > 0) {
    terms.push(...market.localKeywords.slice(0, 2));
  }

  // 添加国家名称（中文）
  terms.push(market.nameZh);

  return terms;
}

/**
 * 检查是否是静态导出模式
 */
function isStaticExport(): boolean {
  const outDir = path.join(process.cwd(), "out");
  return fs.existsSync(outDir);
}

/**
 * 从静态导出目录读取 HTML 文件
 */
function readStaticHtml(url: string): string | null {
  const outDir = path.join(process.cwd(), "out");
  
  // 将 URL 路径转换为文件路径
  // /zh/brazil/slot/payment/ -> out/zh/brazil/slot/payment/index.html
  let filePath = url;
  if (!filePath.startsWith("/")) {
    filePath = `/${filePath}`;
  }
  if (!filePath.endsWith("/")) {
    filePath = `${filePath}/`;
  }
  
  // 移除开头的斜杠
  filePath = filePath.slice(1);
  
  // 构建完整路径
  const htmlPath = path.join(outDir, filePath, "index.html");
  
  if (fs.existsSync(htmlPath)) {
    return fs.readFileSync(htmlPath, "utf-8");
  }
  
  // 尝试不带尾斜杠的路径
  const altPath = path.join(outDir, filePath.slice(0, -1) + ".html");
  if (fs.existsSync(altPath)) {
    return fs.readFileSync(altPath, "utf-8");
  }
  
  return null;
}

/**
 * 检查单个 URL
 */
async function checkUrl(
  url: string,
  baseUrl: string
): Promise<AuditResult["results"][0]> {
  const fullUrl = `${baseUrl}${url}`;
  const result: AuditResult["results"][0] = {
    url,
    status: "PASS",
    checks: {
      statusCode: { passed: false, message: "" },
      title: { passed: false, message: "" },
      h1: { passed: false, message: "" },
      contentLength: { passed: false, message: "" },
      specificTerms: { passed: false, message: "" },
    },
  };

  try {
    let html: string;
    let statusCode: number = 200;

    // 检查是否是静态导出模式
    if (isStaticExport()) {
      // 直接读取 HTML 文件
      const htmlContent = readStaticHtml(url);
      if (htmlContent) {
        html = htmlContent;
        statusCode = 200;
      } else {
        statusCode = 404;
        result.status = "FAIL";
        result.errors = [`File not found: ${url}`];
        result.statusCode = statusCode;
        result.checks.statusCode.passed = false;
        result.checks.statusCode.message = `Expected 200, got ${statusCode}`;
        return result;
      }
    } else {
      // 使用 HTTP 请求
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; BuildAudit/1.0; +https://br21.com)",
        },
      });

      statusCode = response.status;
      result.statusCode = statusCode;
      result.checks.statusCode.passed = response.status === 200;
      result.checks.statusCode.message = response.status === 200
        ? `Status: ${response.status}`
        : `Expected 200, got ${response.status}`;

      if (response.status !== 200) {
        result.status = "FAIL";
        result.errors = [`HTTP ${response.status}`];
        return result;
      }

      html = await response.text();
    }

    // 设置状态码检查结果
    result.statusCode = statusCode;
    result.checks.statusCode.passed = statusCode === 200;
    result.checks.statusCode.message = statusCode === 200
      ? `Status: ${statusCode}`
      : `Expected 200, got ${statusCode}`;

    // 3. 检查 <title> 标签
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1].trim().length > 0) {
      result.checks.title.passed = true;
      result.checks.title.message = `Title: "${titleMatch[1].trim().substring(0, 60)}..."`;
    } else {
      result.checks.title.passed = false;
      result.checks.title.message = "Title tag is empty or missing";
      result.status = "FAIL";
    }

    // 4. 检查 <h1> 标签并验证包含国家名称
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match) {
      const h1Text = h1Match[1].trim();
      // 从 URL 提取市场 slug
      const marketSlug = url.split("/")[2];
      const market = marketServiceMatrix.markets.find(
        (m) => m.slug === marketSlug
      );

      if (market && h1Text.includes(market.nameZh)) {
        result.checks.h1.passed = true;
        result.checks.h1.message = `H1 contains "${market.nameZh}": "${h1Text.substring(0, 60)}..."`;
      } else {
        result.checks.h1.passed = false;
        result.checks.h1.message = `H1 found but doesn't contain country name: "${h1Text.substring(0, 60)}..."`;
        result.status = "FAIL";
      }
    } else {
      result.checks.h1.passed = false;
      result.checks.h1.message = "H1 tag is missing";
      result.status = "FAIL";
    }

    // 5. 检查内容长度
    // 移除 HTML 标签，只计算文本内容长度
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const contentLength = textContent.length;
    result.checks.contentLength.passed = contentLength > 500;
    result.checks.contentLength.message = contentLength > 500
      ? `Content length: ${contentLength} characters`
      : `Content too short: ${contentLength} characters (expected > 500)`;

    if (contentLength <= 500) {
      result.status = "FAIL";
    }

    // 6. 检查特定术语
    const marketSlug = url.split("/")[2];
    const requiredTerms = getMarketSpecificTerms(marketSlug);
    const foundTerms: string[] = [];
    const missingTerms: string[] = [];

    for (const term of requiredTerms) {
      if (html.includes(term) || textContent.includes(term)) {
        foundTerms.push(term);
      } else {
        missingTerms.push(term);
      }
    }

    if (foundTerms.length >= 1) {
      // 至少找到一个术语即可通过
      result.checks.specificTerms.passed = true;
      result.checks.specificTerms.message = `Found terms: ${foundTerms.join(", ")}`;
    } else {
      result.checks.specificTerms.passed = false;
      result.checks.specificTerms.message = `Missing required terms: ${missingTerms.join(", ")}`;
      result.status = "FAIL";
    }
  } catch (error: any) {
    result.status = "FAIL";
    result.errors = [error.message || "Request failed"];
    result.checks.statusCode.passed = false;
    result.checks.statusCode.message = `Error: ${error.message}`;
  }

  return result;
}

/**
 * 主函数
 */
async function main() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const sampleSize = parseInt(process.env.SAMPLE_SIZE || "50", 10);
  const useStaticExport = isStaticExport();

  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}  Pre-Flight Build Audit${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}`);
  
  if (useStaticExport) {
    console.log(`${colors.yellow}Mode: Static Export (reading from out/ directory)${colors.reset}`);
  } else {
    console.log(`Base URL: ${baseUrl}`);
  }
  console.log(`Sample Size: ${sampleSize} URLs\n`);

  // 生成样本 URL
  const urls = generateSampleUrls(sampleSize);
  console.log(`${colors.blue}Generated ${urls.length} sample URLs${colors.reset}\n`);

  // 检查每个 URL
  const results: AuditResult["results"] = [];
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(
      `[${i + 1}/${urls.length}] Checking ${url}... `
    );

    const result = await checkUrl(url, baseUrl);

    if (result.status === "PASS") {
      passed++;
      console.log(`${colors.green}✓ PASS${colors.reset}`);
    } else {
      failed++;
      console.log(`${colors.red}✗ FAIL${colors.reset}`);
      if (result.errors) {
        result.errors.forEach((error) => {
          console.log(`  ${colors.red}Error: ${error}${colors.reset}`);
        });
      }
    }

    results.push(result);

    // 添加小延迟，避免请求过快
    if (i < urls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // 计算通过率
  const summary = {
    statusCodePassRate:
      (results.filter((r) => r.checks.statusCode.passed).length /
        results.length) *
      100,
    titlePassRate:
      (results.filter((r) => r.checks.title.passed).length / results.length) *
      100,
    h1PassRate:
      (results.filter((r) => r.checks.h1.passed).length / results.length) *
      100,
    contentLengthPassRate:
      (results.filter((r) => r.checks.contentLength.passed).length /
        results.length) *
      100,
    specificTermsPassRate:
      (results.filter((r) => r.checks.specificTerms.passed).length /
        results.length) *
      100,
  };

  // 生成报告
  const report: AuditResult = {
    timestamp: new Date().toISOString(),
    baseUrl,
    totalUrls: urls.length,
    passed,
    failed,
    results,
    summary,
  };

  // 输出摘要
  console.log(`\n${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}  Audit Summary${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`Total URLs: ${urls.length}`);
  console.log(
    `${colors.green}Passed: ${passed}${colors.reset} | ${colors.red}Failed: ${failed}${colors.reset}`
  );
  console.log(`\n${colors.blue}Check Pass Rates:${colors.reset}`);
  console.log(
    `  Status Code (200): ${summary.statusCodePassRate.toFixed(1)}% ${
      summary.statusCodePassRate === 100 ? colors.green + "✓" : colors.red + "✗"
    }${colors.reset}`
  );
  console.log(
    `  Title Tag: ${summary.titlePassRate.toFixed(1)}% ${
      summary.titlePassRate === 100 ? colors.green + "✓" : colors.red + "✗"
    }${colors.reset}`
  );
  console.log(
    `  H1 Tag: ${summary.h1PassRate.toFixed(1)}% ${
      summary.h1PassRate === 100 ? colors.green + "✓" : colors.red + "✗"
    }${colors.reset}`
  );
  console.log(
    `  Content Length: ${summary.contentLengthPassRate.toFixed(1)}% ${
      summary.contentLengthPassRate === 100
        ? colors.green + "✓"
        : colors.red + "✗"
    }${colors.reset}`
  );
  console.log(
    `  Specific Terms: ${summary.specificTermsPassRate.toFixed(1)}% ${
      summary.specificTermsPassRate === 100
        ? colors.green + "✓"
        : colors.red + "✗"
    }${colors.reset}`
  );

  // 输出失败的 URL
  if (failed > 0) {
    console.log(`\n${colors.red}Failed URLs:${colors.reset}`);
    results
      .filter((r) => r.status === "FAIL")
      .forEach((r) => {
        console.log(`  ${colors.red}✗${colors.reset} ${r.url}`);
        Object.entries(r.checks).forEach(([key, check]) => {
          if (!check.passed) {
            console.log(`    - ${key}: ${check.message}`);
          }
        });
      });
  }

  // 保存 JSON 报告
  const reportPath = path.join(process.cwd(), "reports", "audit-build.json");
  const reportsDir = path.dirname(reportPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(
    `\n${colors.cyan}Report saved to: ${reportPath}${colors.reset}`
  );

  // 退出码
  process.exit(failed > 0 ? 1 : 0);
}

// 运行主函数
main().catch((error) => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});
