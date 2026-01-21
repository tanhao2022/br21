import Link from "next/link";
import {
  marketServiceMatrix,
  getMarketBySlug,
  getServiceBySlug,
  type Market,
  type Service,
} from "@/lib/seo-matrix";

interface RelatedServicesProps {
  currentCountry: string; // market slug
  currentService: string; // service slug
  currentFeature?: string; // feature slug (optional, for excluding current page)
}

/**
 * RelatedServices 组件
 * 
 * 创建 Topic Cluster 结构，通过内部链接连接相关服务页面
 * 避免 "orphan pages" 问题，提升 SEO 表现
 * 
 * 显示两类相关服务：
 * 1. Same Market, Different Services - 同市场不同服务
 * 2. Same Service, Top Markets - 同服务不同市场
 */
export default function RelatedServices({
  currentCountry,
  currentService,
  currentFeature,
}: RelatedServicesProps) {
  const currentMarket = getMarketBySlug(currentCountry);
  const currentServiceData = getServiceBySlug(currentService);

  if (!currentMarket || !currentServiceData) {
    return null;
  }

  // 1. Same Market, Different Services
  // 找到同市场但不同服务的页面（排除当前服务）
  const sameMarketDifferentServices = marketServiceMatrix.services
    .filter((service) => service.slug !== currentService)
    .slice(0, 4) // 限制4个
    .map((service) => {
      // 选择第一个 feature 作为代表（或可以随机选择）
      const feature = marketServiceMatrix.features[0];
      return {
        market: currentMarket,
        service,
        feature,
        href: `/zh/${currentCountry}/${service.slug}/${feature.slug}/`,
      };
    });

  // 2. Same Service, Top Markets
  // 找到同服务但不同市场的页面（排除当前市场）
  // 优先显示热门市场（Brazil, Philippines, India, Indonesia, Vietnam 按顺序）
  const topMarketsOrder = ["brazil", "philippines", "india", "indonesia", "vietnam"];
  const sameServiceDifferentMarkets = marketServiceMatrix.markets
    .filter((market) => market.slug !== currentCountry)
    .sort((a, b) => {
      // 按热门市场顺序排序
      const indexA = topMarketsOrder.indexOf(a.slug);
      const indexB = topMarketsOrder.indexOf(b.slug);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    })
    .slice(0, 4) // 限制4个
    .map((market) => {
      // 选择第一个 feature 作为代表
      const feature = marketServiceMatrix.features[0];
      return {
        market,
        service: currentServiceData,
        feature,
        href: `/zh/${market.slug}/${currentService}/${feature.slug}/`,
      };
    });

  // 如果没有相关服务，不显示组件
  if (
    sameMarketDifferentServices.length === 0 &&
    sameServiceDifferentMarkets.length === 0
  ) {
    return null;
  }

  return (
    <div className="my-12 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        相关服务推荐
      </h2>

      <div className="space-y-8">
        {/* Same Market, Different Services */}
        {sameMarketDifferentServices.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              {currentMarket.nameZh}市场其他服务
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {sameMarketDifferentServices.map((item) => (
                <RelatedServiceCard
                  key={item.href}
                  market={item.market}
                  service={item.service}
                  feature={item.feature}
                  href={item.href}
                  anchorTextType="same-market"
                />
              ))}
            </div>
          </div>
        )}

        {/* Same Service, Different Markets */}
        {sameServiceDifferentMarkets.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              {currentServiceData.nameZh}服务其他市场
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {sameServiceDifferentMarkets.map((item) => (
                <RelatedServiceCard
                  key={item.href}
                  market={item.market}
                  service={item.service}
                  feature={item.feature}
                  href={item.href}
                  anchorTextType="same-service"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * RelatedServiceCard - 相关服务卡片组件
 */
interface RelatedServiceCardProps {
  market: Market;
  service: Service;
  feature: { slug: string; nameZh: string };
  href: string;
  anchorTextType: "same-market" | "same-service";
}

function RelatedServiceCard({
  market,
  service,
  feature,
  href,
  anchorTextType,
}: RelatedServiceCardProps) {
  // 生成 SEO 友好的锚文本
  const generateAnchorText = (): string => {
    // 安全访问 marketPainPoints
    const marketPainPoints = Array.isArray(market.marketPainPoints)
      ? market.marketPainPoints
      : [];
    const painPoint = marketPainPoints[0] || "核心痛点";
    // 提取痛点关键词（去除括号内容）
    const painPointKeyword = painPoint
      .replace(/（[^）]+）/g, "")
      .replace(/\([^)]+\)/g, "")
      .trim();
    
    if (anchorTextType === "same-market") {
      // 同市场不同服务：使用服务名称和痛点
      // 变体1: 使用服务名称
      const variations = [
        `了解${market.nameZh}${service.nameZh}${feature.nameZh}解决方案`,
        `解决${market.nameZh}${painPointKeyword}的${service.nameZh}方案`,
        `${market.nameZh}${service.nameZh}${feature.nameZh}专业服务`,
        `探索${market.nameZh}市场的${service.nameZh}${feature.nameZh}优化`,
      ];
      
      // 使用确定性哈希选择变体（基于 market + service slug）
      const hash = simpleHash(`${market.slug}-${service.slug}`);
      return variations[hash % variations.length];
    } else {
      // 同服务不同市场：使用市场名称和痛点
      const variations = [
        `了解${market.nameZh}市场的${service.nameZh}${feature.nameZh}服务`,
        `解决${market.nameZh}${painPointKeyword}的${service.nameZh}方案`,
        `${market.nameZh}${service.nameZh}${feature.nameZh}专业解决方案`,
        `探索${market.nameZh}市场的${service.nameZh}${feature.nameZh}优化`,
      ];
      
      const hash = simpleHash(`${market.slug}-${service.slug}`);
      return variations[hash % variations.length];
    }
  };

  const anchorText = generateAnchorText();

  return (
    <Link
      href={href}
      className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          {market.nameZh}
        </span>
        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
          {service.nameZh}
        </span>
      </div>
      <h4 className="mb-2 text-base font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
        {market.nameZh}{service.nameZh}{feature.nameZh}
      </h4>
      <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
        {anchorText}
      </p>
      <div className="mt-3 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300">
        查看详情
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}

/**
 * 简单哈希函数
 * 用于确定性选择锚文本变体
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
