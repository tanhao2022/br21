import { Market, Service } from "./seo-matrix";

/**
 * 内容引擎 - Logic-Based Content Assembler
 * 
 * 用于生成动态、唯一的内容，避免 Google 的 "Doorway Page" 惩罚
 * 通过逻辑组合和句子混洗，确保每个页面都有独特的文本哈希
 */

/**
 * 同义句子库 - 用于句子混洗器
 * 每个数组包含3个同义句子，随机选择1个以确保内容唯一性
 */
const synonymSentences = {
  serviceSolution: [
    "BR21提供专业的解决方案，帮助iGaming运营商在目标市场获取高质量玩家。",
    "BR21通过深度本地化运营和技术优化，为iGaming运营商提供全案服务。",
    "BR21专注于为iGaming运营商提供市场领先的投放技术和转化优化方案。",
  ],
  callToAction: [
    "立即联系BR21专业团队，获取定制化投放方案。",
    "与BR21合作，开启您的iGaming市场增长之旅。",
    "选择BR21，体验专业、高效、合规的广告投放服务。",
  ],
  authorityStatement: [
    "BR21在目标市场已服务超过50+家iGaming运营商，ROI稳定在行业领先水平。",
    "BR21拥有丰富的市场经验和成功案例，帮助客户实现快速起量和稳定增长。",
    "BR21凭借专业团队和先进技术，已成为iGaming行业的可信赖合作伙伴。",
  ],
  marketData: [
    "根据最新市场数据，目标市场的iGaming用户规模持续增长，支付便捷性不断提升。",
    "市场研究显示，目标市场的iGaming渗透率逐年上升，用户付费意愿强烈。",
    "行业报告指出，目标市场的iGaming市场潜力巨大，是值得重点投入的战略市场。",
  ],
  painPointQuestion: [
    "您是否在为支付掉单率高、转化率低而困扰？",
    "您是否在寻找能够有效提升ROI的专业投放服务？",
    "您是否希望找到能够解决市场特有痛点的合作伙伴？",
  ],
};

/**
 * 句子混洗器
 * 从同义句子库中随机选择一个句子，确保内容唯一性
 */
function shuffleSentence(key: keyof typeof synonymSentences): string {
  const sentences = synonymSentences[key];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

/**
 * 生成动态介绍段落
 * 
 * 使用3种变化模式（A/B/C）随机组合，确保每个页面都有独特的文本结构：
 * - Variation A: [Regulatory Warning] + [Service Solution] + [Call to Action]
 * - Variation B: [Local Slang Hook] + [Tech Challenge] + [Success Case Data]
 * - Variation C: [Direct Pain Point Question] + [Market Data] + [Authority Statement]
 * 
 * @param market - 市场数据
 * @param service - 服务数据
 * @returns 生成的介绍段落
 */
export function generateDynamicIntro(
  market: Market,
  service: Service
): string {
  // 使用 market 和 service 的 slug 作为种子，确保相同组合生成相同内容（但不同组合不同）
  const seed = `${market.slug}-${service.slug}`;
  const hash = simpleHash(seed);
  const variation = hash % 3; // 0, 1, 2 对应 A, B, C

  let intro = "";

  switch (variation) {
    case 0: // Variation A: Regulatory Warning + Service Solution + CTA
      intro = `${market.regulatoryContext} ${shuffleSentence("serviceSolution")} ${shuffleSentence("callToAction")}`;
      break;

    case 1: // Variation B: Local Slang Hook + Tech Challenge + Success Data
      const randomSlang =
        market.localSlang[
          Math.floor((hash * 2) % market.localSlang.length)
        ];
      intro = `在${market.nameZh}市场，玩家常用"${randomSlang}"来形容成功的游戏体验。${market.infrastructureChallenge} ${shuffleSentence("authorityStatement")}`;
      break;

    case 2: // Variation C: Pain Point Question + Market Data + Authority
      intro = `${shuffleSentence("painPointQuestion")} ${shuffleSentence("marketData")} ${shuffleSentence("authorityStatement")}`;
      break;
  }

  return intro;
}

/**
 * 简单哈希函数
 * 用于从字符串生成数字种子，确保相同输入产生相同输出
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
 * 生成动态段落
 * 
 * 根据市场和服务组合生成独特的段落内容
 * 
 * @param market - 市场数据
 * @param service - 服务数据
 * @param feature - 功能名称（可选）
 * @returns 生成的段落
 */
export function generateDynamicParagraph(
  market: Market,
  service: Service,
  feature?: string
): string {
  const seed = `${market.slug}-${service.slug}-${feature || "default"}`;
  const hash = simpleHash(seed);

  // 根据哈希值选择不同的段落结构
  const structureIndex = hash % 2;

  if (structureIndex === 0) {
    // 结构1: 市场特点 + 服务优势 + 技术方案
    return `${market.nameZh}市场拥有${market.paymentMethods.length}种主流支付方式，其中${market.paymentMethods[0]}是最常用的支付渠道。${service.nameZh}服务通过${service.technicalPainPoints[0] || "专业技术"}，有效解决${market.marketPainPoints[0] || "核心痛点"}，帮助客户实现${service.conversionHooks[0] || "业务增长"}。`;
  } else {
    // 结构2: 痛点分析 + 解决方案 + 成功案例
    return `在${market.nameZh}市场，${market.marketPainPoints[0] || "核心痛点"}是iGaming运营商面临的主要挑战。BR21通过${service.technicalPainPoints[0] || "专业技术"}和${market.localKeywords[0] || "本地化方案"}，为客户提供${service.conversionHooks[0] || "专业解决方案"}，已帮助50+家运营商实现稳定增长。`;
  }
}

/**
 * 生成动态标题变体
 * 
 * 根据市场和服务生成不同的标题结构
 * 
 * @param market - 市场数据
 * @param service - 服务数据
 * @param feature - 功能名称
 * @returns 生成的标题
 */
export function generateDynamicTitle(
  market: Market,
  service: Service,
  feature: string
): string {
  const seed = `${market.slug}-${service.slug}-${feature}`;
  const hash = simpleHash(seed);
  const primaryPayment = market.paymentMethods[0];

  const titleVariations = [
    `${market.nameZh}${service.nameZh}${feature} | 解决${primaryPayment}核心痛点 | BR21`,
    `${market.nameZh}${service.nameZh}${feature}服务 | ${primaryPayment}支付优化方案 | BR21`,
    `${market.nameZh}市场${service.nameZh}${feature} | ${primaryPayment}技术解决方案 | BR21`,
  ];

  return titleVariations[hash % titleVariations.length];
}

/**
 * 生成动态描述变体
 * 
 * 根据市场和服务生成不同的描述结构
 * 
 * @param market - 市场数据
 * @param service - 服务数据
 * @param feature - 功能名称
 * @returns 生成的描述
 */
export function generateDynamicDescription(
  market: Market,
  service: Service,
  feature: string
): string {
  const seed = `${market.slug}-${service.slug}-${feature}`;
  const hash = simpleHash(seed);
  const primaryPayment = market.paymentMethods[0];

  const descVariations = [
    `${market.nameZh}是${getMarketDescriptionShort(market)}。BR21专注${market.nameZh}${service.nameZh}${feature}服务，解决${primaryPayment}${market.marketPainPoints[0] || "核心痛点"}。提供${service.conversionHooks[0] || "专业解决方案"}，ROI稳定在行业领先水平。`,
    `BR21为${market.nameZh}市场的iGaming运营商提供${service.nameZh}${feature}服务。通过${primaryPayment}支付优化和${service.technicalPainPoints[0] || "专业技术"}，有效解决${market.marketPainPoints[0] || "核心痛点"}，帮助客户实现快速起量和稳定增长。`,
    `在${market.nameZh}市场，${market.marketPainPoints[0] || "核心痛点"}是iGaming运营商面临的主要挑战。BR21通过${service.nameZh}${feature}服务，提供${primaryPayment}支付优化和${service.technicalPainPoints[0] || "专业技术"}，已帮助50+家运营商实现ROI提升。`,
  ];

  return descVariations[hash % descVariations.length];
}

/**
 * 获取市场简短描述
 */
function getMarketDescriptionShort(market: Market): string {
  const descriptions: Record<string, string> = {
    brazil: "拉丁美洲最大的iGaming市场",
    philippines: "亚洲博彩中心，玩家最成熟",
    india: "市场不缺流量，缺的是真实充值用户",
    indonesia: "全球Slot流量最大的市场",
    vietnam: "玩家赌性极强，单次充值大",
  };

  return descriptions[market.slug] || "重要的iGaming市场";
}
