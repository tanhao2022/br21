import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  marketServiceMatrix,
  getMarketBySlug,
  getServiceBySlug,
  getFeatureBySlug,
  getLocalizedKeywords,
  getTechnicalPainPoints,
  getConversionHooks,
  type Market,
  type Service,
  type Feature,
} from "@/lib/seo-matrix";
import {
  generateDynamicIntro,
  generateDynamicParagraph,
} from "@/lib/content-engine";
import ProgrammaticPage from "@/components/ProgrammaticPage";
import {
  PaymentStatusDashboard,
  BanShieldMonitor,
  CapiDataFlow,
} from "@/components/features";

interface PageProps {
  params: Promise<{
    country: string;
    service: string;
    feature: string;
  }> | {
    country: string;
    service: string;
    feature: string;
  };
}

/**
 * 生成所有静态参数组合
 * Country * Service * Feature = 5 * 4 * 4 = 80 个页面
 */
export async function generateStaticParams() {
  const { markets, services, features } = marketServiceMatrix;

  const params: Array<{
    country: string;
    service: string;
    feature: string;
  }> = [];

  // 生成所有组合
  for (const market of markets) {
    for (const service of services) {
      for (const feature of features) {
        params.push({
          country: market.slug,
          service: service.slug,
          feature: feature.slug,
        });
      }
    }
  }

  return params;
}

/**
 * 生成动态 metadata
 * Title 必须包含本地支付方式（降低内容相似度）
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    // 处理 params 可能是 Promise 的情况（Next.js 15）
    const resolvedParams = await Promise.resolve(params);
    const { country, service, feature } = resolvedParams;

    // 参数验证和日志
    if (!country || !service || !feature) {
      console.error("[generateMetadata] Missing params:", { country, service, feature });
      return {
        title: "页面未找到",
        description: "请求的页面不存在",
      };
    }

    const market = getMarketBySlug(country);
    const serviceData = getServiceBySlug(service);
    const featureData = getFeatureBySlug(feature);

    // 如果参数无效，返回 404
    if (!market || !serviceData || !featureData) {
      console.error("[generateMetadata] Invalid params:", {
        country,
        service,
        feature,
        marketFound: !!market,
        serviceFound: !!serviceData,
        featureFound: !!featureData,
      });
      return {
        title: "页面未找到",
        description: "请求的页面不存在",
      };
    }

    // 获取主要支付方式（用于 Title 差异化）
    const primaryPaymentMethod =
      (Array.isArray(market.paymentMethods) && market.paymentMethods[0]) ||
      "Payment";

    // 生成差异化的 Title（必须包含本地支付方式）
    // 格式：{国家} {服务} {功能} | 解决 {支付方式} {核心痛点} | BR21
    // 限制长度在 60 字符以内（Google 推荐）
    const painPoint = getMainPainPoint(market, serviceData);
    let title = `${market.nameZh}${serviceData.nameZh}${featureData.nameZh} | 解决${primaryPaymentMethod}${painPoint} | BR21`;
    if (title.length > 60) {
      // 如果过长，截断痛点部分
      const maxPainPointLength = 60 - (title.length - painPoint.length);
      const truncatedPainPoint = maxPainPointLength > 0 
        ? painPoint.substring(0, maxPainPointLength - 3) + "..."
        : "";
      title = `${market.nameZh}${serviceData.nameZh}${featureData.nameZh} | 解决${primaryPaymentMethod}${truncatedPainPoint} | BR21`;
      // 如果还是过长，进一步截断
      if (title.length > 60) {
        title = title.substring(0, 57) + "...";
      }
    }

    // 生成差异化的 Description
    // 包含：市场特点 + 支付方式 + 功能价值 + 转化钩子
    // 限制长度在 160 字符以内（Google 推荐）
    const localizedKeywords = getLocalizedKeywords(country, service, feature);
    const painPoints = getTechnicalPainPoints(country, service);
    const hooks = getConversionHooks(country, service);

    let description = `${market.nameZh}是${getMarketDescription(market)}。BR21专注${market.nameZh}${serviceData.nameZh}${featureData.nameZh}服务，解决${primaryPaymentMethod}${painPoints[0] || "核心痛点"}。提供${hooks[0] || "专业解决方案"}，${getROIRange(market)}。`;
    if (description.length > 160) {
      // 截断到 160 字符，保留完整句子
      description = description.substring(0, 157) + "...";
    }

    // 生成关键词（包含本地化关键词，安全访问）
    const keywords = [
      `${market.nameZh}${serviceData.nameZh}${featureData.nameZh}`,
      `${market.nameZh}${serviceData.nameZh}`,
      `${primaryPaymentMethod}${featureData.nameZh}`,
      ...(Array.isArray(localizedKeywords) ? localizedKeywords.slice(0, 5) : []),
      ...(Array.isArray(serviceData.serviceKeywords)
        ? serviceData.serviceKeywords.slice(0, 2)
        : []),
      ...(Array.isArray(featureData.featureKeywords)
        ? featureData.featureKeywords.slice(0, 2)
        : []),
    ];

    // 生成正确的 canonical URL 路径（与 trailingSlash: true 保持一致）
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";
    const canonicalPath = `/zh/${country}/${service}/${feature}/`;
    const canonical = `${baseUrl}${canonicalPath}`;

    // 生成完整的 metadata（包含正确的 canonical URL）
    return {
      title,
      description,
      keywords: keywords.join(", "),
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        type: "article",
        locale: "zh_CN",
        url: canonical,
        siteName: "BR21",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error: any) {
    console.error("[generateMetadata] CRITICAL ERROR:", {
      error: error.message,
      stack: error.stack,
      params: params,
    });
    // 返回安全的默认 metadata，避免页面崩溃
    return {
      title: "页面加载错误",
      description: "页面生成时发生错误，请稍后重试",
    };
  }
}

/**
 * 获取市场描述（用于 description）
 */
function getMarketDescription(market: Market | undefined) {
  if (!market) return "";
  
  const descriptions: Record<string, string> = {
    brazil: "拉丁美洲最大的iGaming市场，拥有超过1.5亿互联网用户",
    philippines: "亚洲博彩中心，玩家最成熟，LTV（生命周期价值）最高",
    india: "市场不缺流量，缺的是真实充值用户",
    indonesia: "全球Slot流量最大的市场，关键词'Slot Gacor'的搜索量常年霸榜",
    vietnam: "玩家赌性极强，单次充值大，LTV高",
  };

  return descriptions[market.slug] || "重要的iGaming市场";
}

/**
 * 获取主要痛点（用于 Title）
 */
function getMainPainPoint(
  market: Market | undefined,
  service: Service | undefined
) {
  if (!market || !service) return "核心痛点";

  // 优先使用市场痛点（安全访问）
  const marketPainPoints = Array.isArray(market.marketPainPoints)
    ? market.marketPainPoints
    : [];
  if (marketPainPoints.length > 0) {
    // 提取痛点关键词（去除括号内容）
    const painPoint = marketPainPoints[0]
      .replace(/（[^）]+）/g, "")
      .replace(/\([^)]+\)/g, "");
    return painPoint;
  }

  // 其次使用服务痛点（安全访问）
  const servicePainPoints = Array.isArray(service.technicalPainPoints)
    ? service.technicalPainPoints
    : [];
  if (servicePainPoints.length > 0) {
    return servicePainPoints[0]
      .replace(/（[^）]+）/g, "")
      .replace(/\([^)]+\)/g, "");
  }

  return "核心痛点";
}

/**
 * 获取 ROI 范围（用于 description）
 */
function getROIRange(market: Market | undefined) {
  if (!market) return "ROI稳定在120%-250%";

  const roiRanges: Record<string, string> = {
    brazil: "ROI稳定在150%-250%",
    philippines: "ROI稳定在140%-240%",
    india: "ROI稳定在120%-220%",
    indonesia: "ROI稳定在130%-230%",
    vietnam: "ROI稳定在130%-230%",
  };

  return roiRanges[market.slug] || "ROI稳定在120%-250%";
}

/**
 * 主页面组件
 */
export default async function DynamicServicePage({ params }: PageProps) {
  try {
    // 处理 params 可能是 Promise 的情况（Next.js 15）
    const resolvedParams = await Promise.resolve(params);
    const { country, service, feature } = resolvedParams;

    // 参数验证和日志
    if (!country || !service || !feature) {
      console.error("[DynamicServicePage] Missing params:", {
        country,
        service,
        feature,
      });
      notFound();
    }

    const market = getMarketBySlug(country);
    const serviceData = getServiceBySlug(service);
    const featureData = getFeatureBySlug(feature);

    // 如果参数无效，返回 404
    if (!market || !serviceData || !featureData) {
      console.error("[DynamicServicePage] Invalid params:", {
        country,
        service,
        feature,
        marketFound: !!market,
        serviceFound: !!serviceData,
        featureFound: !!featureData,
      });
      notFound();
    }

    // 根据 feature 渲染不同的 Hero Component（Above the fold）
    let HeroComponent: React.ReactNode = null;

    try {
      if (feature === "payment") {
        const paymentMethod =
          (Array.isArray(market.paymentMethods) &&
            market.paymentMethods[0]) ||
          "Payment";
        HeroComponent = (
          <PaymentStatusDashboard
            country={market.name}
            method={paymentMethod}
          />
        );
      } else if (feature === "account-ban") {
        HeroComponent = <BanShieldMonitor />;
      } else if (feature === "capi") {
        HeroComponent = <CapiDataFlow />;
      }
      // agency 功能可以显示默认内容或自定义组件
    } catch (heroError: any) {
      console.error("[DynamicServicePage] Hero Component Error:", {
        error: heroError.message,
        stack: heroError.stack,
        feature,
      });
      // 继续执行，Hero Component 失败不影响页面渲染
    }

    // 生成简化的页面内容（仅用于SEO文本，不再生成大量Markdown）
    let simplifiedContent: string;
    try {
      simplifiedContent = generateSimplifiedContent(
        market,
        serviceData,
        featureData
      );
    } catch (contentError: any) {
      console.error("[DynamicServicePage] Content Generation Error:", {
        error: contentError.message,
        stack: contentError.stack,
      });
      // 使用安全的默认内容
      simplifiedContent = `# ${market.nameZh}${serviceData.nameZh}${featureData.nameZh}\n\nBR21提供专业的${market.nameZh}${serviceData.nameZh}${featureData.nameZh}服务。`;
    }

    // 构造 MDX 格式的数据结构（安全访问所有字段）
    const primaryPayment =
      (Array.isArray(market.paymentMethods) && market.paymentMethods[0]) ||
      "Payment";
    const painPoints = getTechnicalPainPoints(country, service);
    const hooks = getConversionHooks(country, service);
    const keywords = getLocalizedKeywords(country, service, feature);

    const mdxData = {
      frontMatter: {
        title: `${market.nameZh}${serviceData.nameZh}${featureData.nameZh} | 解决${primaryPayment}${getMainPainPoint(market, serviceData)} | BR21`,
        description: `${market.nameZh}是${getMarketDescription(market)}。BR21专注${market.nameZh}${serviceData.nameZh}${featureData.nameZh}服务，解决${primaryPayment}${painPoints[0] || "核心痛点"}。提供${hooks[0] || "专业解决方案"}，${getROIRange(market)}。`,
        keywords: Array.isArray(keywords) ? keywords : [],
        country: market.name,
        countrySlug: country,
        serviceType: serviceData.nameZh,
        faq: generateFAQ(market, serviceData, featureData),
      },
      content: simplifiedContent,
      slug: `${country}-${service}-${feature}`,
    };

    return (
      <ProgrammaticPage
        data={mdxData}
        heroComponent={HeroComponent}
        params={{ country, service, feature }}
      />
    );
  } catch (error: any) {
    console.error("[DynamicServicePage] CRITICAL ERROR:", {
      error: error.message,
      stack: error.stack,
      params: params,
    });
    // 返回 404 而不是崩溃
    notFound();
  }
}

/**
 * 生成简化的页面内容（仅用于SEO文本，不再生成大量Markdown）
 * 使用内容引擎生成动态、唯一的内容，避免重复内容惩罚
 * 主要内容通过 Hero Component 和 ProgrammaticPage 中的国家特定组件渲染
 */
function generateSimplifiedContent(
  market: Market,
  service: Service,
  feature: Feature
): string {
  // 安全访问 paymentMethods
  const paymentMethods = Array.isArray(market.paymentMethods)
    ? market.paymentMethods
    : [];
  const primaryPayment = paymentMethods[0] || "Payment";

  // 安全访问 painPoints（确保数组存在）
  const marketPainPoints = Array.isArray(market.marketPainPoints)
    ? market.marketPainPoints
    : [];
  const servicePainPoints = Array.isArray(service.technicalPainPoints)
    ? service.technicalPainPoints
    : [];
  const painPoints = marketPainPoints.concat(servicePainPoints);

  // 使用内容引擎生成动态介绍段落
  const dynamicIntro = generateDynamicIntro(market, service);
  const dynamicParagraph = generateDynamicParagraph(market, service, feature.nameZh);

  // 安全访问 technicalTerms
  const technicalTerms = Array.isArray(feature.technicalTerms)
    ? feature.technicalTerms
    : [];

  // 生成痛点部分（安全处理）
  const painPointsSection =
    painPoints.length > 0
      ? painPoints
          .slice(0, 2)
          .map((point, index) => {
            // 为每个痛点生成稍微不同的描述，确保唯一性
            const solutionVariations = [
              `BR21通过${technicalTerms[0] || "专业技术"}和${technicalTerms[1] || "优化方案"}，有效解决${point}，提升转化率和ROI。`,
              `针对${point}，BR21提供${technicalTerms[0] || "专业技术"}解决方案，帮助客户实现业务增长。`,
              `BR21的${technicalTerms[0] || "专业技术"}能够有效应对${point}，为客户创造价值。`,
            ];
            const variationIndex =
              (index + market.slug.length + service.slug.length) %
              solutionVariations.length;
            return `### 痛点 ${index + 1}：${point}

${solutionVariations[variationIndex]}`;
          })
          .join("\n\n")
      : `### 核心痛点

BR21通过${technicalTerms[0] || "专业技术"}和${technicalTerms[1] || "优化方案"}，有效解决市场核心痛点，提升转化率和ROI。`;

  // 生成技术方案详解部分
  const technicalSolutionSection = generateTechnicalSolutionSection(
    market,
    service,
    feature,
    technicalTerms
  );

  // 生成服务流程部分
  const serviceProcessSection = generateServiceProcessSection(
    market,
    service,
    feature
  );

  // 生成数据对比部分
  const dataComparisonSection = generateDataComparisonSection(
    market,
    service,
    feature,
    primaryPayment
  );

  // 生成成功案例部分
  const successCaseSection = generateSuccessCaseSection(
    market,
    service,
    feature
  );

  return `# ${market.nameZh}${service.nameZh}${feature.nameZh} | 解决${primaryPayment}核心痛点

${dynamicIntro}

${dynamicParagraph}

## 核心痛点

${painPointsSection}

## 技术方案详解

${technicalSolutionSection}

## 服务流程

${serviceProcessSection}

## 数据对比

${dataComparisonSection}

## 成功案例

${successCaseSection}

## 服务优势

BR21在${market.nameZh}市场已服务超过**50+**家iGaming运营商，${getROIRange(market)}。通过${primaryPayment}支付优化和${feature.nameZh}技术，帮助客户实现支付成功率提升**30%-50%**，ROI稳定在**${getROIRange(market).match(/\d+%-\d+%/) || "120%-250%"}**，3-5天快速起量。`;
}


/**
 * 生成技术方案详解部分
 */
function generateTechnicalSolutionSection(
  market: Market,
  service: Service,
  feature: Feature,
  technicalTerms: string[]
): string {
  const seed = `${market.slug}-${service.slug}-${feature.slug}-technical`;
  const hash = simpleHash(seed);
  const variation = hash % 3;

  const primaryPayment = Array.isArray(market.paymentMethods) && market.paymentMethods[0] 
    ? market.paymentMethods[0] 
    : "Payment";
  const term1 = technicalTerms[0] || "专业技术";
  const term2 = technicalTerms[1] || "优化方案";
  const term3 = technicalTerms[2] || "创新技术";

  const solutions = [
    `BR21通过${term1}和${term2}，构建完整的${market.nameZh}${service.nameZh}${feature.nameZh}解决方案。核心包括：**1) ${term1}**：实时监控${primaryPayment}支付成功率，智能切换高成功率通道；**2) ${term2}**：优化支付页面加载速度，简化支付流程；**3) ${term3}**：建立完善的异常处理机制，确保支付链路稳定运行。`,
    `在${market.nameZh}市场，${service.nameZh}${feature.nameZh}的核心挑战是${market.marketPainPoints[0] || "核心痛点"}。BR21的解决方案包括：**技术层面**：通过${term1}实现实时数据监控和智能路由；**运营层面**：本地化素材团队，深度理解${market.nameZh}用户习惯；**风控层面**：${term2}确保账户安全和合规运营。`,
    `BR21的${market.nameZh}${service.nameZh}${feature.nameZh}技术方案采用三层架构：**基础层**：${term1}确保支付通道稳定；**优化层**：${term2}提升转化率和ROI；**创新层**：${term3}应对市场变化和平台政策调整。通过这套完整方案，实测支付成功率可稳定在85%以上，ROI提升30%-50%。`,
  ];

  return solutions[variation];
}

/**
 * 生成服务流程部分
 */
function generateServiceProcessSection(
  market: Market,
  service: Service,
  feature: Feature
): string {
  const seed = `${market.slug}-${service.slug}-${feature.slug}-process`;
  const hash = simpleHash(seed);
  const variation = hash % 2;

  const primaryPayment = Array.isArray(market.paymentMethods) && market.paymentMethods[0] 
    ? market.paymentMethods[0] 
    : "Payment";

  if (variation === 0) {
    return `### 第一步：需求分析与方案制定

BR21专业团队深入分析客户在${market.nameZh}市场的具体需求，包括${service.nameZh}类型、目标受众、预算规模等。基于${market.nameZh}市场特点和${primaryPayment}支付环境，制定定制化投放方案。

### 第二步：账户准备与技术对接

准备${market.nameZh}市场专用的白名单账户，确保账户质量和合规性。同时完成${primaryPayment}支付通道对接、CAPI回传配置、数据监控系统搭建等技术准备工作。

### 第三步：素材制作与本地化优化

BR21本地化素材团队深度理解${market.nameZh}用户习惯和文化特点，制作符合当地审美的广告素材。素材经过A/B测试优化，确保CTR和转化率最大化。

### 第四步：投放执行与实时优化

开始投放后，BR21团队7×24小时监控投放数据，实时调整出价、定向、素材等策略。通过数据驱动优化，确保ROI稳定在${getROIRange(market)}。`;
  } else {
    return `### 阶段一：启动准备（1-2天）

完成账户准备、${primaryPayment}支付通道对接、技术系统配置。BR21团队与客户确认投放策略、预算分配、KPI目标等关键事项。

### 阶段二：测试优化（3-5天）

小预算测试不同素材、定向、出价策略，快速识别高转化组合。通过A/B测试和数据分析，确定最优投放方案。

### 阶段三：放量增长（持续）

在测试验证的基础上，逐步扩大投放规模。BR21团队持续监控数据，实时优化策略，确保ROI稳定在${getROIRange(market)}。同时建立完善的异常处理机制，应对突发情况。`;
  }
}

/**
 * 生成数据对比部分
 */
function generateDataComparisonSection(
  market: Market,
  service: Service,
  feature: Feature,
  primaryPayment: string
): string {
  const seed = `${market.slug}-${service.slug}-${feature.slug}-data`;
  const hash = simpleHash(seed);
  const variation = hash % 2;

  const roiRange = getROIRange(market);
  const roiMatch = roiRange.match(/(\d+%)-(\d+%)/);
  const roiMin = roiMatch ? roiMatch[1] : "120%";
  const roiMax = roiMatch ? roiMatch[2] : "250%";

  if (variation === 0) {
    return `### 行业平均水平 vs BR21优化后

| 指标 | 行业平均 | BR21优化后 | 提升幅度 |
|------|---------|-----------|---------|
| ${primaryPayment}支付成功率 | 60%-70% | 85%-95% | **+25%-35%** |
| ROI | 80%-120% | ${roiMin}-${roiMax} | **+40%-130%** |
| 起量时间 | 10-15天 | 3-5天 | **缩短60%-70%** |
| 账户稳定性 | 30%-50% | 85%-95% | **+35%-65%** |

### 关键数据说明

- **支付成功率提升**：通过动态支付路由和智能通道切换，${primaryPayment}支付成功率从行业平均60%-70%提升至85%-95%，每提升1%成功率，ROI直接提升5%-8%。
- **ROI提升**：通过${feature.nameZh}技术优化，ROI从行业平均80%-120%提升至${roiMin}-${roiMax}，长期稳定盈利。
- **起量速度**：BR21成熟的投放流程和技术方案，将起量时间从行业平均10-15天缩短至3-5天，快速抢占市场机会。`;
  } else {
    return `### 优化前后对比

**优化前**：
- ${primaryPayment}支付成功率：60%-70%
- ROI：80%-120%
- 账户封号率：30%-50%
- 起量时间：10-15天

**BR21优化后**：
- ${primaryPayment}支付成功率：**85%-95%**（提升25%-35%）
- ROI：**${roiMin}-${roiMax}**（提升40%-130%）
- 账户封号率：**5%-15%**（降低15%-45%）
- 起量时间：**3-5天**（缩短60%-70%）

### 核心价值

通过BR21的${market.nameZh}${service.nameZh}${feature.nameZh}服务，客户不仅获得更高的ROI和更快的起量速度，更重要的是建立了稳定的投放体系，能够长期稳定盈利。BR21在${market.nameZh}市场已服务超过50+家iGaming运营商，平均ROI稳定在${roiMin}-${roiMax}。`;
  }
}

/**
 * 生成成功案例部分
 */
function generateSuccessCaseSection(
  market: Market,
  service: Service,
  feature: Feature
): string {
  const seed = `${market.slug}-${service.slug}-${feature.slug}-case`;
  const hash = simpleHash(seed);
  const variation = hash % 3;

  const primaryPayment = Array.isArray(market.paymentMethods) && market.paymentMethods[0] 
    ? market.paymentMethods[0] 
    : "Payment";
  const roiRange = getROIRange(market);

  const cases = [
    `### 案例一：${market.nameZh}${service.nameZh}运营商A

**挑战**：${market.marketPainPoints[0] || "核心痛点"}，ROI长期低于100%，无法盈利。

**BR21解决方案**：通过${feature.nameZh}技术优化${primaryPayment}支付链路，建立动态支付路由系统，实时监控成功率并智能切换通道。

**效果**：${primaryPayment}支付成功率从65%提升至88%，ROI从95%提升至${roiRange.match(/\d+%-\d+%/) || "150%-250%"}，3天内实现稳定盈利。客户反馈："BR21的专业方案帮助我们快速解决了支付问题，ROI显著提升。"`,

    `### 案例二：${market.nameZh}${service.nameZh}运营商B

**挑战**：账户封号频繁，投放不稳定，无法持续增长。

**BR21解决方案**：提供白名单账户资源，配合${feature.nameZh}技术，建立完善的账户管理和风控体系。

**效果**：账户封号率从40%降低至8%，投放稳定性提升80%，ROI稳定在${roiRange.match(/\d+%-\d+%/) || "150%-250%"}。客户反馈："BR21的账户质量和技术方案让我们能够稳定投放，不再担心封号问题。"`,

    `### 案例三：${market.nameZh}${service.nameZh}运营商C

**挑战**：起量慢，10天才能看到效果，错过市场机会。

**BR21解决方案**：优化投放流程，使用成熟的素材库和定向策略，配合${feature.nameZh}技术快速起量。

**效果**：起量时间从12天缩短至4天，ROI在5天内达到${roiRange.match(/\d+%-\d+%/) || "150%-250%"}。客户反馈："BR21的快速起量能力让我们能够快速抢占市场，获得先发优势。"`,
  ];

  return cases[variation];
}

/**
 * 简单哈希函数（用于内容生成）
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * 生成 FAQ
 */
function generateFAQ(
  market: Market,
  service: Service,
  feature: Feature
) {
  // 安全访问所有字段
  const primaryPayment =
    (Array.isArray(market.paymentMethods) && market.paymentMethods[0]) ||
    "Payment";
  const marketPainPoints = Array.isArray(market.marketPainPoints)
    ? market.marketPainPoints
    : [];
  const painPoint = marketPainPoints[0] || "核心痛点";
  const technicalTerms = Array.isArray(feature.technicalTerms)
    ? feature.technicalTerms
    : [];

  // 安全获取 conversion hooks
  const hooks = getConversionHooks(market.slug, service.slug);
  const hookText = Array.isArray(hooks) && hooks.length > 0 ? hooks[0] : "专业解决方案";

  return [
    {
      question: `为什么选择${market.nameZh}${service.nameZh}${feature.nameZh}？`,
      answer: `${market.nameZh}是${getMarketDescription(market)}。BR21专注${market.nameZh}${service.nameZh}${feature.nameZh}服务，解决${primaryPayment}${painPoint}。提供${hookText}，${getROIRange(market)}。`,
    },
    {
      question: `${market.nameZh}${service.nameZh}${feature.nameZh}的核心挑战是什么？`,
      answer: `${market.nameZh}市场主要挑战：${marketPainPoints.slice(0, 3).join("；")}。BR21通过${technicalTerms[0] || "专业技术"}、${technicalTerms[1] || "优化方案"}，解决这些痛点。`,
    },
    {
      question: `如何解决${primaryPayment}${painPoint.replace(/（[^）]+）/g, "").replace(/\([^)]+\)/g, "")}？`,
      answer: `BR21通过${technicalTerms[0] || "专业技术"}，集成多家${market.nameZh}本地支付商，系统实时监控成功率，智能切换高成功率通道。实测${primaryPayment}成功率可稳定在85%以上，每提升1%成功率，ROI直接提升5%-8%。`,
    },
  ];
}
