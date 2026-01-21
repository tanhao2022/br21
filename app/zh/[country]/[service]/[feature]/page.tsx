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
import { generateServiceMetadata } from "@/lib/utils/metadata";
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
    const title = `${market.nameZh}${serviceData.nameZh}${featureData.nameZh} | 解决${primaryPaymentMethod}${getMainPainPoint(market, serviceData)} | BR21`;

    // 生成差异化的 Description
    // 包含：市场特点 + 支付方式 + 功能价值 + 转化钩子
    const localizedKeywords = getLocalizedKeywords(country, service, feature);
    const painPoints = getTechnicalPainPoints(country, service);
    const hooks = getConversionHooks(country, service);

    const description = `${market.nameZh}是${getMarketDescription(market)}。BR21专注${market.nameZh}${serviceData.nameZh}${featureData.nameZh}服务，解决${primaryPaymentMethod}${painPoints[0] || "核心痛点"}。提供${hooks[0] || "专业解决方案"}，${getROIRange(market)}。`;

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

    // 生成 slug（用于 canonical URL）
    const slug = `${country}-${service}-${feature}`;

    // 使用 generateServiceMetadata 生成完整的 metadata（包含 canonical）
    return generateServiceMetadata(
      {
        title,
        description,
        keywords,
        country: market.name,
        countrySlug: country,
        serviceType: serviceData.nameZh,
      },
      slug
    );
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

  return `# ${market.nameZh}${service.nameZh}${feature.nameZh} | 解决${primaryPayment}核心痛点

${dynamicIntro}

${dynamicParagraph}

## 核心痛点

${painPointsSection}

## 服务优势

BR21在${market.nameZh}市场已服务超过**50+**家iGaming运营商，${getROIRange(market)}。通过${primaryPayment}支付优化和${feature.nameZh}技术，帮助客户实现支付成功率提升**30%-50%**，ROI稳定在**${getROIRange(market).match(/\d+%-\d+%/) || "120%-250%"}**，3-5天快速起量。`;
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
