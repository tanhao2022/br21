#!/usr/bin/env node
/**
 * Post-Deploy SEO Audit Script
 * 
 * 上线后自动检查致命SEO问题
 * 
 * 检查项：
 * 1. robots.txt 检查
 * 2. sitemap.xml 检查
 * 3. 关键URL 200检查
 * 4. canonical 抽查
 * 5. JSON-LD 抽查
 * 6. 重定向循环风险检查
 */

import fs from "fs";
import path from "path";

interface AuditResult {
  timestamp: string;
  baseUrl: string;
  robots: {
    status: "PASS" | "FAIL";
    statusCode?: number;
    disallowsZh?: boolean;
    hasSitemap?: boolean;
    sitemapUrl?: string;
    error?: string;
  };
  sitemap: {
    status: "PASS" | "FAIL";
    statusCode?: number;
    urlCount?: number;
    sampleUrls?: string[];
    invalidUrls?: string[];
    error?: string;
  };
  criticalUrls: {
    status: "PASS" | "FAIL";
    checked: Array<{
      path: string;
      statusCode: number;
      finalUrl?: string;
      error?: string;
    }>;
    failed: string[];
  };
  canonical: {
    status: "PASS" | "FAIL";
    checked: Array<{
      path: string;
      expected: string;
      actual?: string;
      status: "PASS" | "FAIL";
      error?: string;
    }>;
  };
  jsonLd: {
    status: "PASS" | "FAIL";
    checked: Array<{
      path: string;
      hasJsonLd: boolean;
      hasServiceSchema: boolean;
      hasFaqSchema: boolean;
      error?: string;
    }>;
  };
  redirects: {
    status: "PASS" | "FAIL";
    home: {
      finalUrl: string;
      redirectCount: number;
      redirectChain: string[];
    };
    zh: {
      finalUrl: string;
      redirectCount: number;
      redirectChain: string[];
    };
    hasLoop?: boolean;
    error?: string;
  };
  overall: {
    status: "PASS" | "FAIL";
    fatalIssues: string[];
  };
}

// 获取BASE_URL（环境变量或命令行参数）
const BASE_URL = process.env.BASE_URL || "https://www.br21.com";

// 关键URL列表
const CRITICAL_URLS = [
  "/zh/slot-ditou",
  "/zh/brazil",
  "/zh/philippines",
  "/zh/indonesia",
  "/zh/india",
  "/zh/brazil-slot-ditou",
  "/zh/philippines-slot-ditou",
  "/zh/indonesia-slot-ditou",
  "/zh/india-rummy-ditou",
  "/zh/slot-capi",
];

// Canonical抽查URL（服务页）
const CANONICAL_CHECK_URLS = [
  "/zh/brazil-slot-ditou",
  "/zh/philippines-slot-ditou",
  "/zh/slot-capi",
];

// 工具函数：跟随重定向获取最终URL
async function fetchWithRedirects(
  url: string,
  maxRedirects: number = 10
): Promise<{
  finalUrl: string;
  statusCode: number;
  redirectChain: string[];
  body?: string;
}> {
  const redirectChain: string[] = [url];
  let currentUrl = url;
  let statusCode = 0;

  for (let i = 0; i < maxRedirects; i++) {
    try {
      const response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual", // 手动处理重定向
        headers: {
          "User-Agent": "BR21-PostDeploy-Audit/1.0",
        },
      });

      statusCode = response.status;

      if (statusCode >= 200 && statusCode < 300) {
        // 成功，返回内容
        const body = await response.text();
        return {
          finalUrl: currentUrl,
          statusCode,
          redirectChain,
          body,
        };
      } else if (statusCode >= 300 && statusCode < 400) {
        // 重定向
        const location = response.headers.get("location");
        if (location) {
          const nextUrl = new URL(location, currentUrl).href;
          redirectChain.push(nextUrl);
          currentUrl = nextUrl;
          continue;
        }
      }

      // 非重定向状态码，返回
      return {
        finalUrl: currentUrl,
        statusCode,
        redirectChain,
      };
    } catch (error: any) {
      return {
        finalUrl: currentUrl,
        statusCode: 0,
        redirectChain,
      };
    }
  }

  return {
    finalUrl: currentUrl,
    statusCode,
    redirectChain,
  };
}

// 工具函数：检查robots.txt
async function checkRobots(baseUrl: string): Promise<AuditResult["robots"]> {
  try {
    const url = `${baseUrl}/robots.txt`;
    const response = await fetch(url, {
      headers: { "User-Agent": "BR21-PostDeploy-Audit/1.0" },
    });

    if (response.status !== 200) {
      return {
        status: "FAIL",
        statusCode: response.status,
        error: `robots.txt returned status ${response.status}`,
      };
    }

    const text = await response.text();
    const disallowsZh = /Disallow:\s*\/zh\//i.test(text);
    const sitemapMatch = text.match(/Sitemap:\s*(.+)/i);
    const hasSitemap = !!sitemapMatch;
    const sitemapUrl = sitemapMatch ? sitemapMatch[1].trim() : undefined;

    if (disallowsZh) {
      return {
        status: "FAIL",
        statusCode: 200,
        disallowsZh: true,
        hasSitemap,
        sitemapUrl,
        error: "robots.txt contains 'Disallow: /zh/' which blocks crawling",
      };
    }

    if (!hasSitemap) {
      return {
        status: "FAIL",
        statusCode: 200,
        disallowsZh: false,
        hasSitemap: false,
        error: "robots.txt does not contain Sitemap directive",
      };
    }

    return {
      status: "PASS",
      statusCode: 200,
      disallowsZh: false,
      hasSitemap: true,
      sitemapUrl,
    };
  } catch (error: any) {
    return {
      status: "FAIL",
      error: error.message || "Failed to fetch robots.txt",
    };
  }
}

// 工具函数：检查sitemap.xml
async function checkSitemap(baseUrl: string): Promise<AuditResult["sitemap"]> {
  try {
    const url = `${baseUrl}/sitemap.xml`;
    const response = await fetch(url, {
      headers: { "User-Agent": "BR21-PostDeploy-Audit/1.0" },
    });

    if (response.status !== 200) {
      return {
        status: "FAIL",
        statusCode: response.status,
        error: `sitemap.xml returned status ${response.status}`,
      };
    }

    const text = await response.text();

    // 检查是否包含 <urlset>
    if (!text.includes("<urlset")) {
      return {
        status: "FAIL",
        statusCode: 200,
        error: "sitemap.xml does not contain <urlset>",
      };
    }

    // 提取所有 <loc> 标签
    const locMatches = text.match(/<loc>(.*?)<\/loc>/gi);
    if (!locMatches || locMatches.length === 0) {
      return {
        status: "FAIL",
        statusCode: 200,
        error: "sitemap.xml contains no <loc> tags",
      };
    }

    const urls = locMatches.map((match) => {
      const content = match.replace(/<\/?loc>/gi, "").trim();
      return content;
    });

    // 检查前20个URL
    const sampleUrls = urls.slice(0, 20);
    const invalidUrls: string[] = [];
    let hasZhPage = false;

    for (const url of sampleUrls) {
      if (!url.startsWith(baseUrl)) {
        invalidUrls.push(url);
      }
      if (url.includes("/zh/")) {
        hasZhPage = true;
      }
    }

    if (invalidUrls.length > 0) {
      return {
        status: "FAIL",
        statusCode: 200,
        urlCount: urls.length,
        sampleUrls: sampleUrls.slice(0, 5),
        invalidUrls: invalidUrls.slice(0, 5),
        error: `Found ${invalidUrls.length} URLs not starting with ${baseUrl}`,
      };
    }

    if (!hasZhPage) {
      return {
        status: "FAIL",
        statusCode: 200,
        urlCount: urls.length,
        sampleUrls: sampleUrls.slice(0, 5),
        error: "sitemap.xml does not contain any /zh/ pages in first 20 URLs",
      };
    }

    return {
      status: "PASS",
      statusCode: 200,
      urlCount: urls.length,
      sampleUrls: sampleUrls.slice(0, 5),
    };
  } catch (error: any) {
    return {
      status: "FAIL",
      error: error.message || "Failed to fetch sitemap.xml",
    };
  }
}

// 工具函数：检查关键URL
async function checkCriticalUrls(
  baseUrl: string,
  paths: string[]
): Promise<AuditResult["criticalUrls"]> {
  const checked: AuditResult["criticalUrls"]["checked"] = [];
  const failed: string[] = [];

  for (const path of paths) {
    try {
      const url = `${baseUrl}${path}`;
      const result = await fetchWithRedirects(url);

      checked.push({
        path,
        statusCode: result.statusCode,
        finalUrl: result.finalUrl,
      });

      if (result.statusCode !== 200) {
        failed.push(path);
      }
    } catch (error: any) {
      checked.push({
        path,
        statusCode: 0,
        error: error.message || "Request failed",
      });
      failed.push(path);
    }
  }

  return {
    status: failed.length === 0 ? "PASS" : "FAIL",
    checked,
    failed,
  };
}

// 工具函数：检查canonical
// 注意：URL会通过308重定向到带尾斜杠的版本，expected应该是最终URL（带尾斜杠）
async function checkCanonical(
  baseUrl: string,
  paths: string[]
): Promise<AuditResult["canonical"]> {
  const checked: AuditResult["canonical"]["checked"] = [];

  for (const path of paths) {
    try {
      // 请求不带尾斜杠的URL（会触发308重定向到带尾斜杠版本）
      const initialUrl = `${baseUrl}${path}`;
      const result = await fetchWithRedirects(initialUrl);

      if (result.statusCode !== 200 || !result.body) {
        checked.push({
          path,
          expected: result.finalUrl || initialUrl,
          status: "FAIL",
          error: `Status ${result.statusCode} or no body`,
        });
        continue;
      }

      // 最终URL（带尾斜杠）作为expected
      // 规范化：确保URL格式一致（去除查询参数和hash，统一尾斜杠）
      const finalUrl = new URL(result.finalUrl);
      finalUrl.search = "";
      finalUrl.hash = "";
      // 确保路径以/结尾（符合308重定向规范）
      if (!finalUrl.pathname.endsWith("/") && finalUrl.pathname !== "/") {
        finalUrl.pathname = `${finalUrl.pathname}/`;
      }
      const expected = finalUrl.href;

      // 提取canonical
      const canonicalMatch = result.body.match(
        /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i
      );

      if (!canonicalMatch) {
        checked.push({
          path,
          expected,
          status: "FAIL",
          error: "No canonical link found",
        });
        continue;
      }

      const actual = canonicalMatch[1];
      // 处理相对URL，规范化
      let actualUrl: string;
      if (actual.startsWith("http")) {
        actualUrl = actual;
      } else {
        actualUrl = new URL(actual, baseUrl).href;
      }

      // 规范化actualUrl（去除查询参数和hash，统一尾斜杠）
      const actualUrlObj = new URL(actualUrl);
      actualUrlObj.search = "";
      actualUrlObj.hash = "";
      // 确保路径以/结尾
      if (!actualUrlObj.pathname.endsWith("/") && actualUrlObj.pathname !== "/") {
        actualUrlObj.pathname = `${actualUrlObj.pathname}/`;
      }
      const normalizedActual = actualUrlObj.href;

      if (normalizedActual === expected) {
        checked.push({
          path,
          expected,
          actual: normalizedActual,
          status: "PASS",
        });
      } else {
        checked.push({
          path,
          expected,
          actual: normalizedActual,
          status: "FAIL",
          error: `Canonical mismatch: expected ${expected}, got ${normalizedActual}`,
        });
      }
    } catch (error: any) {
      checked.push({
        path,
        expected: `${baseUrl}${path}/`,
        status: "FAIL",
        error: error.message || "Request failed",
      });
    }
  }

  const allPassed = checked.every((c) => c.status === "PASS");
  return {
    status: allPassed ? "PASS" : "FAIL",
    checked,
  };
}

// 工具函数：检查JSON-LD
async function checkJsonLd(
  baseUrl: string,
  paths: string[]
): Promise<AuditResult["jsonLd"]> {
  const checked: AuditResult["jsonLd"]["checked"] = [];

  for (const path of paths) {
    try {
      const url = `${baseUrl}${path}`;
      const result = await fetchWithRedirects(url);

      if (result.statusCode !== 200 || !result.body) {
        checked.push({
          path,
          hasJsonLd: false,
          hasServiceSchema: false,
          hasFaqSchema: false,
          error: `Status ${result.statusCode} or no body`,
        });
        continue;
      }

      // 提取所有JSON-LD脚本
      const jsonLdMatches = result.body.match(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      );

      if (!jsonLdMatches || jsonLdMatches.length === 0) {
        checked.push({
          path,
          hasJsonLd: false,
          hasServiceSchema: false,
          hasFaqSchema: false,
          error: "No JSON-LD script found",
        });
        continue;
      }

      let hasServiceSchema = false;
      let hasFaqSchema = false;

      for (const match of jsonLdMatches) {
        const content = match.replace(
          /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i,
          ""
        ).replace(/<\/script>/i, "").trim();

        try {
          const json = JSON.parse(content);
          if (json["@type"] === "Service" || (Array.isArray(json) && json.some((item: any) => item["@type"] === "Service"))) {
            hasServiceSchema = true;
          }
          if (json["@type"] === "FAQPage" || (Array.isArray(json) && json.some((item: any) => item["@type"] === "FAQPage"))) {
            hasFaqSchema = true;
          }
        } catch (e) {
          // 忽略JSON解析错误
        }
      }

      if (!hasServiceSchema) {
        checked.push({
          path,
          hasJsonLd: true,
          hasServiceSchema: false,
          hasFaqSchema,
          error: "No Service schema found in JSON-LD",
        });
      } else {
        checked.push({
          path,
          hasJsonLd: true,
          hasServiceSchema: true,
          hasFaqSchema,
        });
      }
    } catch (error: any) {
      checked.push({
        path,
        hasJsonLd: false,
        hasServiceSchema: false,
        hasFaqSchema: false,
        error: error.message || "Request failed",
      });
    }
  }

  const allPassed = checked.every((c) => c.hasServiceSchema);
  return {
    status: allPassed ? "PASS" : "FAIL",
    checked,
  };
}

// 工具函数：检查重定向循环
async function checkRedirects(
  baseUrl: string
): Promise<AuditResult["redirects"]> {
  try {
    // 检查首页
    const homeResult = await fetchWithRedirects(`${baseUrl}/`);
    // 检查/zh/
    const zhResult = await fetchWithRedirects(`${baseUrl}/zh/`);

    // 检查是否有循环（重定向次数过多或最终URL异常）
    const homeRedirectCount = homeResult.redirectChain.length - 1;
    const zhRedirectCount = zhResult.redirectChain.length - 1;
    const hasLoop =
      homeRedirectCount > 3 ||
      zhRedirectCount > 3 ||
      (homeResult.finalUrl === zhResult.finalUrl &&
        homeResult.redirectChain.length > 1 &&
        zhResult.redirectChain.length > 1);

    return {
      status: hasLoop ? "FAIL" : "PASS",
      home: {
        finalUrl: homeResult.finalUrl,
        redirectCount: homeResult.redirectChain.length - 1,
        redirectChain: homeResult.redirectChain,
      },
      zh: {
        finalUrl: zhResult.finalUrl,
        redirectCount: zhResult.redirectChain.length - 1,
        redirectChain: zhResult.redirectChain,
      },
      hasLoop,
    };
  } catch (error: any) {
    return {
      status: "FAIL",
      home: {
        finalUrl: "",
        redirectCount: 0,
        redirectChain: [],
      },
      zh: {
        finalUrl: "",
        redirectCount: 0,
        redirectChain: [],
      },
      error: error.message || "Failed to check redirects",
    };
  }
}

// 主函数
async function main() {
  console.log(`\n🔍 上线后SEO排雷检查`);
  console.log(`📍 BASE_URL: ${BASE_URL}\n`);

  const result: AuditResult = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    robots: { status: "FAIL" },
    sitemap: { status: "FAIL" },
    criticalUrls: { status: "FAIL", checked: [], failed: [] },
    canonical: { status: "FAIL", checked: [] },
    jsonLd: { status: "FAIL", checked: [] },
    redirects: {
      status: "FAIL",
      home: { finalUrl: "", redirectCount: 0, redirectChain: [] },
      zh: { finalUrl: "", redirectCount: 0, redirectChain: [] },
    },
    overall: { status: "FAIL", fatalIssues: [] },
  };

  // 1. 检查robots.txt
  console.log("1️⃣  检查 robots.txt...");
  result.robots = await checkRobots(BASE_URL);
  console.log(
    `   ${result.robots.status === "PASS" ? "✅" : "❌"} ${result.robots.status}`
  );
  if (result.robots.status === "FAIL") {
    console.log(`   ⚠️  ${result.robots.error}`);
  } else {
    console.log(`   ✓ Status: ${result.robots.statusCode}`);
    console.log(`   ✓ Sitemap: ${result.robots.sitemapUrl}`);
  }

  // 2. 检查sitemap.xml
  console.log("\n2️⃣  检查 sitemap.xml...");
  result.sitemap = await checkSitemap(BASE_URL);
  console.log(
    `   ${result.sitemap.status === "PASS" ? "✅" : "❌"} ${result.sitemap.status}`
  );
  if (result.sitemap.status === "FAIL") {
    console.log(`   ⚠️  ${result.sitemap.error}`);
  } else {
    console.log(`   ✓ URLs: ${result.sitemap.urlCount}`);
    if (result.sitemap.sampleUrls) {
      console.log(
        `   ✓ 示例: ${result.sitemap.sampleUrls.slice(0, 2).join(", ")}`
      );
    }
  }

  // 3. 检查关键URL
  console.log("\n3️⃣  检查关键URL (200状态)...");
  result.criticalUrls = await checkCriticalUrls(BASE_URL, CRITICAL_URLS);
  console.log(
    `   ${result.criticalUrls.status === "PASS" ? "✅" : "❌"} ${result.criticalUrls.status}`
  );
  console.log(
    `   ✓ 检查: ${result.criticalUrls.checked.length} 个，失败: ${result.criticalUrls.failed.length} 个`
  );
  if (result.criticalUrls.failed.length > 0) {
    console.log(`   ⚠️  失败URL: ${result.criticalUrls.failed.join(", ")}`);
  }

  // 4. 检查canonical
  console.log("\n4️⃣  检查 canonical...");
  result.canonical = await checkCanonical(BASE_URL, CANONICAL_CHECK_URLS);
  console.log(
    `   ${result.canonical.status === "PASS" ? "✅" : "❌"} ${result.canonical.status}`
  );
  const canonicalFailed = result.canonical.checked.filter(
    (c) => c.status === "FAIL"
  );
  if (canonicalFailed.length > 0) {
    console.log(`   ⚠️  失败: ${canonicalFailed.length} 个`);
    canonicalFailed.forEach((c) => {
      console.log(`      - ${c.path}: ${c.error}`);
    });
  }

  // 5. 检查JSON-LD
  console.log("\n5️⃣  检查 JSON-LD...");
  result.jsonLd = await checkJsonLd(BASE_URL, CANONICAL_CHECK_URLS);
  console.log(
    `   ${result.jsonLd.status === "PASS" ? "✅" : "❌"} ${result.jsonLd.status}`
  );
  const jsonLdFailed = result.jsonLd.checked.filter(
    (c) => !c.hasServiceSchema
  );
  if (jsonLdFailed.length > 0) {
    console.log(`   ⚠️  缺少Service Schema: ${jsonLdFailed.length} 个`);
    jsonLdFailed.forEach((c) => {
      console.log(`      - ${c.path}: ${c.error}`);
    });
  }

  // 6. 检查重定向循环
  console.log("\n6️⃣  检查重定向循环...");
  result.redirects = await checkRedirects(BASE_URL);
  console.log(
    `   ${result.redirects.status === "PASS" ? "✅" : "❌"} ${result.redirects.status}`
  );
  console.log(`   ✓ /: ${result.redirects.home.redirectCount} 次重定向`);
  console.log(`   ✓ /zh/: ${result.redirects.zh.redirectCount} 次重定向`);
  if (result.redirects.hasLoop) {
    console.log(`   ⚠️  检测到重定向循环风险`);
  }

  // 汇总致命问题
  if (result.robots.status === "FAIL") {
    result.overall.fatalIssues.push("robots.txt检查失败");
  }
  if (result.sitemap.status === "FAIL") {
    result.overall.fatalIssues.push("sitemap.xml检查失败");
  }
  if (result.criticalUrls.status === "FAIL") {
    result.overall.fatalIssues.push(
      `关键URL失败: ${result.criticalUrls.failed.length} 个`
    );
  }
  if (result.canonical.status === "FAIL") {
    result.overall.fatalIssues.push("canonical检查失败");
  }
  if (result.redirects.status === "FAIL") {
    result.overall.fatalIssues.push("重定向循环风险");
  }

  result.overall.status =
    result.overall.fatalIssues.length === 0 ? "PASS" : "FAIL";

  // 输出摘要
  console.log("\n" + "=".repeat(50));
  console.log("📊 检查摘要");
  console.log("=".repeat(50));
  console.log(`总体状态: ${result.overall.status === "PASS" ? "✅ PASS" : "❌ FAIL"}`);
  if (result.overall.fatalIssues.length > 0) {
    console.log("\n致命问题:");
    result.overall.fatalIssues.forEach((issue) => {
      console.log(`  ❌ ${issue}`);
    });
  } else {
    console.log("\n✅ 所有检查项通过！");
  }
  console.log("=".repeat(50) + "\n");

  // 保存报告
  const reportsDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  const reportPath = path.join(reportsDir, "postdeploy-audit.json");
  fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
  console.log(`📄 报告已保存: ${reportPath}\n`);

  // 退出码
  process.exit(result.overall.status === "PASS" ? 0 : 1);
}

main().catch((error) => {
  console.error("❌ 脚本执行失败:", error);
  process.exit(1);
});
