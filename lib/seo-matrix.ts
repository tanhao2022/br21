/**
 * SEO Data Matrix - 结构化数据矩阵
 * 
 * 此文件是 Programmatic SEO 的核心数据源，用于：
 * 1. 生成差异化的页面内容（降低内容相似度）
 * 2. 确保每个市场-服务-功能组合都有独特的SEO元素
 * 3. 提供本地化关键词和技术痛点数据
 * 
 * 数据结构：
 * - Markets: 市场维度（国家/地区）
 * - Services: 服务维度（游戏类型）
 * - Features: 功能维度（服务特性）
 */

export interface Market {
  slug: string;
  name: string;
  nameZh: string; // 中文名称
  currency: string;
  currencySymbol: string;
  paymentMethods: string[]; // 支付方式列表
  localComplianceBody?: string; // 本地合规机构
  language: string;
  languageCode: string; // ISO 639-1 语言代码
  timezone: string;
  // SEO相关
  localKeywords: string[]; // 本地化关键词（用于差异化内容）
  marketPainPoints: string[]; // 市场特有痛点
  culturalHooks: string[]; // 文化钩子（用于转化文案）
  // 内容引擎增强字段
  regulatoryContext: string; // 当地法律合规段落
  infrastructureChallenge: string; // 技术基础设施挑战段落
  localSlang: string[]; // 本地俚语/术语数组
}

export interface Service {
  slug: string;
  name: string;
  nameZh: string; // 中文名称
  technicalPainPoints: string[]; // 技术痛点（用于差异化内容）
  conversionHooks: string[]; // 转化钩子（用于CTA和文案）
  // SEO相关
  serviceKeywords: string[]; // 服务相关关键词
  targetAudience: string[]; // 目标受众特征
}

export interface Feature {
  slug: string;
  name: string;
  nameZh: string; // 中文名称
  description: string; // 功能描述
  // SEO相关
  featureKeywords: string[]; // 功能相关关键词
  technicalTerms: string[]; // 技术术语（用于差异化）
}

/**
 * 市场数据矩阵
 * 包含5个核心市场：Brazil, Philippines, India, Indonesia, Vietnam
 */
export const marketServiceMatrix: {
  markets: Market[];
  services: Service[];
  features: Feature[];
} = {
  markets: [
    {
      slug: "brazil",
      name: "Brazil",
      nameZh: "巴西",
      currency: "BRL",
      currencySymbol: "R$",
      paymentMethods: ["PIX", "Boleto", "Credit Card", "Nubank", "Itaú", "Bradesco"],
      localComplianceBody: "Anatel",
      language: "Portuguese",
      languageCode: "pt-BR",
      timezone: "America/Sao_Paulo",
      localKeywords: [
        "PIX",
        "CPF",
        "Claro",
        "Vivo",
        "Tim",
        "Oi",
        "葡语素材",
        "二不限账户",
        "三不限账户",
        "Cloaking 3.0",
        "动态支付路由",
        "域名屏蔽",
        "即时到账",
      ],
      marketPainPoints: [
        "PIX支付掉单率高（平均20%-25%）",
        "CPF验证失败",
        "域名屏蔽频繁（Claro、Vivo等运营商）",
        "账户封号风险高（平台审核严格）",
        "网络超时导致支付失败",
        "银行风控拦截",
      ],
      culturalHooks: [
        "暴富心理",
        "娱乐解压",
        "即时到账",
        "高ROI回报",
        "白名单账户保障",
      ],
      regulatoryContext:
        "在巴西，根据2023年颁布的《第14.790号法律》（Lei 14.790/23），iGaming广告投放必须严格遵守Anatel（国家电信局）的合规要求。该法律明确禁止使用误导性语言、虚假承诺，并要求所有广告素材必须通过Anatel预审核流程。违反规定的运营商将面临高额罚款和账户永久封禁的风险。BR21深度理解巴西法律框架，确保所有广告内容完全符合Anatel规范，为客户提供合规保障。",
      infrastructureChallenge:
        "巴西的PIX即时支付系统虽然便捷，但在高峰时段（如世界杯、狂欢节期间）经常面临网络拥堵问题，导致支付掉单率飙升至25%以上。此外，巴西三大运营商（Claro、Vivo、Tim）的域名屏蔽机制频繁触发，广告链接在用户点击后无法正常加载，转化率大幅下降。BR21通过动态支付路由技术和多CDN分发策略，将PIX支付成功率稳定在85%以上，并有效规避域名屏蔽风险。",
      localSlang: [
        "Jogo do Tigrinho",
        "Dar um jeito",
        "Fazer a grana",
        "Bater a meta",
        "Cair na real",
        "Tirar onda",
      ],
    },
    {
      slug: "philippines",
      name: "Philippines",
      nameZh: "菲律宾",
      currency: "PHP",
      currencySymbol: "₱",
      paymentMethods: ["GCash", "Maya", "PayMaya", "7-Eleven", "Palawan Express"],
      language: "English",
      languageCode: "en-PH",
      timezone: "Asia/Manila",
      localKeywords: [
        "GCash",
        "Maya",
        "PayMaya",
        "Messenger Bot",
        "Messenger Funnel",
        "私域运营",
        "7-11充值",
        "本地化素材",
        "LP链路优化",
        "追单系统",
        "新手礼包",
      ],
      marketPainPoints: [
        "GCash入金率低（支付页面加载慢）",
        "支付流程复杂（用户输入多）",
        "封号控制（平台审核严格）",
        "素材审核敏感点",
        "回传准确率低",
        "Messenger转化链路断裂",
      ],
      culturalHooks: [
        "成熟玩家市场",
        "高LTV价值",
        "私域运营",
        "Messenger自动化",
        "本地化信任",
      ],
      regulatoryContext:
        "菲律宾作为亚洲博彩中心，其iGaming行业受PAGCOR（菲律宾娱乐和博彩公司）严格监管。根据《共和国法案第9487号》（RA 9487），所有在线博彩广告必须获得PAGCOR颁发的合法牌照，并遵守严格的广告内容规范。未经授权的广告投放将面临法律风险和账户封禁。BR21与持有PAGCOR牌照的运营商深度合作，确保所有广告投放完全合规，为客户提供法律保障。",
      infrastructureChallenge:
        "菲律宾的GCash电子钱包系统在高峰时段（如发薪日、节假日）经常出现服务器过载，导致支付页面加载时间超过10秒，用户跳出率高达40%。此外，菲律宾的网络基础设施相对薄弱，部分地区4G信号不稳定，用户在支付过程中频繁遭遇网络中断。BR21通过优化支付页面加载速度（3秒内完成）、集成7-11便利店充值渠道，以及Messenger Bot自动追单系统，将GCash入金率提升30%-50%。",
      localSlang: [
        "Sugal",
        "POGO",
        "Taya",
        "Lucky",
        "Jackpot",
        "Big Win",
      ],
    },
    {
      slug: "india",
      name: "India",
      nameZh: "印度",
      currency: "INR",
      currencySymbol: "₹",
      paymentMethods: ["UPI", "Paytm", "PhonePe", "Google Pay", "Razorpay"],
      language: "English",
      languageCode: "en-IN",
      timezone: "Asia/Kolkata",
      localKeywords: [
        "UPI",
        "Paytm",
        "PhonePe",
        "Google UAC",
        "UAC事件流",
        "PWA技术",
        "真人口播素材",
        "Testimonials",
        "AddCash优化",
        "事件流优化",
        "Google Play规避",
      ],
      marketPainPoints: [
        "UPI/Paytm支付掉单（网络延迟）",
        "Google UAC假量（$0.1 CPI但全是机器人）",
        "回传归因数据不对齐",
        "机器学习优化失败",
        "用户犹豫不决导致支付放弃",
        "Google Play审核极严",
      ],
      culturalHooks: [
        "真实充值用户",
        "高价值用户筛选",
        "真人口播信任",
        "PWA永不下架",
        "事件流精准优化",
      ],
      regulatoryContext:
        "印度对真金游戏（RMG）的监管极其严格，根据《信息技术法案》（IT Act 2000）和《在线游戏规则》（Online Gaming Rules 2023），所有涉及真金交易的游戏必须获得各邦政府颁发的合法牌照。Google Play对RMG应用审核极严，未经授权的应用将被永久下架。BR21通过PWA技术规避Google Play审核，确保应用永不下架，同时与持有合法牌照的运营商合作，确保完全合规。",
      infrastructureChallenge:
        "印度的UPI支付系统在高峰时段（如板球比赛期间、排灯节等重大节日）经常面临网络延迟，支付掉单率高达15%。此外，印度市场假量产业成熟，专门有刷安装的工作室，$0.1的CPI看起来很便宜，但全是机器人，无法产生真实充值。BR21放弃Install优化，转向AddCash（充值）事件优化，让Google算法寻找有支付习惯的真实高价值用户，有效规避假量问题。",
      localSlang: [
        "Teen Patti",
        "Rummy",
        "AddCash",
        "Real Money",
        "Lucky Draw",
        "Big Win",
      ],
    },
    {
      slug: "indonesia",
      name: "Indonesia",
      nameZh: "印尼",
      currency: "IDR",
      currencySymbol: "Rp",
      paymentMethods: ["Dana", "OVO", "GoPay", "LinkAja", "Doku"],
      language: "Indonesian",
      languageCode: "id-ID",
      timezone: "Asia/Jakarta",
      localKeywords: [
        "Dana",
        "OVO",
        "GoPay",
        "Slot Gacor",
        "Gacor Maxwin",
        "Gacor Scatter",
        "Gacor Hari Ini",
        "KOL直播带玩",
        "本地KOL",
        "直播爆奖",
        "第四方支付",
        "便利店充值",
      ],
      marketPainPoints: [
        "Dana/OVO/GoPay支付通道风控（频繁掉单）",
        "无法唤起电子钱包APP",
        "素材表达禁区（敏感词汇和画面）",
        "封号与账户结构（需要本地IP养号）",
        "回传对齐问题",
        "支付成功率低（<70%）",
      ],
      culturalHooks: [
        "Gacor语义（容易爆奖）",
        "KOL信任背书",
        "直播带玩真实感",
        "爆奖瞬间刺激",
        "本地化运营",
      ],
      regulatoryContext:
        "印尼对在线博彩的监管相对宽松，但要求所有广告内容必须符合当地文化规范，禁止使用敏感词汇和画面。根据《信息与电子交易法》（UU ITE），违反文化规范的广告将面临法律风险。BR21深度理解印尼文化，确保所有素材完全本地化，避免文化冲突，为客户提供合规保障。",
      infrastructureChallenge:
        "印尼的电子钱包系统（Dana、OVO、GoPay）在高峰时段经常出现支付通道风控，频繁掉单，支付成功率低至70%以下。此外，印尼用户极度依赖信任感，单纯的图片广告转化率已降至冰点。BR21通过对接本地第四方支付、签约50+印尼本地Slot主播进行KOL直播带玩，将支付成功率提升至80%以上，CTR提升300%。",
      localSlang: [
        "Gacor",
        "Maxwin",
        "Scatter",
        "Hari Ini",
        "Jackpot",
        "Lucky",
      ],
    },
    {
      slug: "vietnam",
      name: "Vietnam",
      nameZh: "越南",
      currency: "VND",
      currencySymbol: "₫",
      paymentMethods: ["MoMo", "ZaloPay", "ViettelPay", "VNPay", "Bank Transfer"],
      language: "Vietnamese",
      languageCode: "vi-VN",
      timezone: "Asia/Ho_Chi_Minh",
      localKeywords: [
        "MoMo",
        "Zalo",
        "Zalo私域",
        "Tài Xỉu",
        "Xóc Đĩa",
        "Nổ Hũ",
        "Reels推广",
        "品牌词霸屏",
        "私域流量池",
        "多账户矩阵",
      ],
      marketPainPoints: [
        "MoMo支付掉单",
        "平台封号严重",
        "竞争激烈导致获客成本上升",
        "支付通道不稳定",
        "账户管理复杂",
      ],
      culturalHooks: [
        "赌性强",
        "单次充值大",
        "快节奏游戏",
        "私域运营",
        "Reels曝光",
      ],
      regulatoryContext:
        "越南对在线博彩的监管相对严格，根据《刑法典》第321条，未经授权的在线博彩活动将面临法律风险。然而，越南用户对Zalo等本地社交平台信任度高，通过私域运营可以有效规避监管风险。BR21通过Zalo私域流量池和多账户矩阵策略，将流量存到私域，不受平台封号影响，为客户提供稳定的流量保障。",
      infrastructureChallenge:
        "越南的MoMo支付系统在高峰时段经常出现支付掉单，支付成功率低至75%以下。此外，越南市场竞争激烈，获客成本不断上升，单纯依赖广告投放已无法维持盈利。BR21通过完善的技术对接和多通道备选，将MoMo支付成功率提升至95%以上，同时通过Zalo私域运营和Reels推广，降低获客成本，提升用户LTV。",
      localSlang: [
        "Tài Xỉu",
        "Xóc Đĩa",
        "Nổ Hũ",
        "Lucky",
        "Jackpot",
        "Big Win",
      ],
    },
  ],

  services: [
    {
      slug: "slot",
      name: "Slot",
      nameZh: "老虎机",
      technicalPainPoints: [
        "账户封号风险",
        "素材审核不通过",
        "支付掉单率高",
        "回传数据不对齐",
        "域名屏蔽",
        "Cloaking技术失效",
        "LP转化率低",
        "ROI不稳定",
      ],
      conversionHooks: [
        "高ROI回报（150%-250%）",
        "白名单账户保障",
        "3-5天快速起量",
        "动态支付路由",
        "本地化素材",
        "Cloaking 3.0技术",
        "CAPI回传优化",
      ],
      serviceKeywords: [
        "Slot代投",
        "老虎机代投",
        "Slot广告",
        "老虎机广告",
        "Slot投放",
        "老虎机投放",
      ],
      targetAudience: [
        "iGaming运营商",
        "博彩平台",
        "游戏开发商",
        "广告代理商",
      ],
    },
    {
      slug: "rummy",
      name: "Rummy",
      nameZh: "拉米纸牌",
      technicalPainPoints: [
        "Google Play审核严格",
        "假量问题严重",
        "支付通道不稳定",
        "用户留存率低",
        "回传归因困难",
        "UAC优化失败",
      ],
      conversionHooks: [
        "PWA技术规避审核",
        "真实充值用户",
        "事件流优化",
        "真人口播素材",
        "AddCash事件优化",
        "永不下架",
      ],
      serviceKeywords: [
        "Rummy代投",
        "拉米纸牌代投",
        "Rummy广告",
        "真金游戏代投",
        "RMG代投",
      ],
      targetAudience: [
        "Rummy游戏运营商",
        "真金游戏平台",
        "印度市场运营商",
      ],
    },
    {
      slug: "crash",
      name: "Crash",
      nameZh: "崩盘游戏",
      technicalPainPoints: [
        "用户流失快",
        "转化率低",
        "支付成功率低",
        "回传延迟",
      ],
      conversionHooks: [
        "快节奏游戏",
        "高刺激体验",
        "即时到账",
        "快速转化",
      ],
      serviceKeywords: [
        "Crash代投",
        "崩盘游戏代投",
        "Crash广告",
        "崩盘游戏广告",
      ],
      targetAudience: [
        "Crash游戏运营商",
        "快节奏游戏平台",
      ],
    },
    {
      slug: "sportsbook",
      name: "Sportsbook",
      nameZh: "体育博彩",
      technicalPainPoints: [
        "赛事期间流量波动大",
        "支付通道压力大",
        "回传数据量大",
        "账户风控严格",
      ],
      conversionHooks: [
        "赛事期间高转化",
        "实时数据回传",
        "多支付通道",
        "稳定账户保障",
      ],
      serviceKeywords: [
        "Sportsbook代投",
        "体育博彩代投",
        "Sportsbook广告",
        "体育博彩广告",
      ],
      targetAudience: [
        "体育博彩平台",
        "赛事投注运营商",
      ],
    },
  ],

  features: [
    {
      slug: "agency",
      name: "Agency",
      nameZh: "代投",
      description: "专业的广告账户管理和投放服务，包括账户注册、素材制作、投放优化等全链路服务",
      featureKeywords: [
        "代投",
        "代投服务",
        "广告代投",
        "账户代投",
        "全案代投",
        "一站式代投",
      ],
      technicalTerms: [
        "账户管理",
        "素材制作",
        "投放优化",
        "账户注册",
        "白名单账户",
        "二不限账户",
        "三不限账户",
      ],
    },
    {
      slug: "account-ban",
      name: "Account Ban",
      nameZh: "封号",
      description: "解决广告账户被封禁的问题，包括账户解封、防封技术、多账户矩阵等解决方案",
      featureKeywords: [
        "封号",
        "账户封禁",
        "防封",
        "解封",
        "账户安全",
        "封号解决方案",
      ],
      technicalTerms: [
        "Cloaking 3.0",
        "IP指纹识别",
        "User-Agent分析",
        "多账户矩阵",
        "账户养号",
        "本地IP",
        "审核规避",
      ],
    },
    {
      slug: "payment",
      name: "Payment",
      nameZh: "支付",
      description: "优化支付流程，提升支付成功率，包括动态支付路由、支付页面优化、多通道备选等",
      featureKeywords: [
        "支付优化",
        "支付成功率",
        "支付掉单",
        "支付路由",
        "入金率",
        "支付通道",
      ],
      technicalTerms: [
        "动态支付路由",
        "支付页面优化",
        "多通道备选",
        "第四方支付",
        "支付成功率",
        "掉单率",
        "CPF验证",
        "网络超时",
        "银行风控",
      ],
    },
    {
      slug: "capi",
      name: "CAPI",
      nameZh: "回传",
      description: "Conversions API回传优化，确保数据准确对齐，提升机器学习优化效果",
      featureKeywords: [
        "CAPI",
        "回传",
        "回团",
        "数据回传",
        "CAPI回传",
        "回传优化",
        "数据对齐",
      ],
      technicalTerms: [
        "Conversions API",
        "事件流",
        "数据对齐",
        "回传准确率",
        "归因优化",
        "Pixel数据",
        "服务器端回传",
      ],
    },
  ],
};

/**
 * 辅助函数：根据slug获取市场数据
 * 大小写不敏感，确保 URL 参数匹配
 */
export function getMarketBySlug(slug: string): Market | undefined {
  if (!slug) return undefined;
  return marketServiceMatrix.markets.find(
    (m) => m.slug.toLowerCase() === slug.toLowerCase()
  );
}

/**
 * 辅助函数：根据slug获取服务数据
 * 大小写不敏感，确保 URL 参数匹配
 */
export function getServiceBySlug(slug: string): Service | undefined {
  if (!slug) return undefined;
  return marketServiceMatrix.services.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );
}

/**
 * 辅助函数：根据slug获取功能数据
 * 大小写不敏感，确保 URL 参数匹配
 */
export function getFeatureBySlug(slug: string): Feature | undefined {
  if (!slug) return undefined;
  return marketServiceMatrix.features.find(
    (f) => f.slug.toLowerCase() === slug.toLowerCase()
  );
}

/**
 * 辅助函数：生成市场-服务-功能组合的唯一标识
 * 用于生成差异化的页面slug和内容
 */
export function generateCombinationSlug(
  marketSlug: string,
  serviceSlug: string,
  featureSlug?: string
): string {
  if (featureSlug) {
    return `${marketSlug}-${serviceSlug}-${featureSlug}`;
  }
  return `${marketSlug}-${serviceSlug}`;
}

/**
 * 辅助函数：获取市场-服务组合的本地化关键词
 * 用于生成差异化的title和description
 * 安全返回：如果找不到匹配，返回空数组而不是抛出错误
 */
export function getLocalizedKeywords(
  marketSlug: string,
  serviceSlug: string,
  featureSlug?: string
): string[] {
  if (!marketSlug || !serviceSlug) {
    return [];
  }

  try {
    const market = getMarketBySlug(marketSlug);
    const service = getServiceBySlug(serviceSlug);
    const feature = featureSlug ? getFeatureBySlug(featureSlug) : undefined;

    const keywords: string[] = [];

    // 市场关键词（安全访问）
    if (market && Array.isArray(market.localKeywords)) {
      keywords.push(...market.localKeywords);
    }

    // 服务关键词（安全访问）
    if (service && Array.isArray(service.serviceKeywords)) {
      keywords.push(...service.serviceKeywords);
    }

    // 功能关键词（安全访问）
    if (feature && Array.isArray(feature.featureKeywords)) {
      keywords.push(...feature.featureKeywords);
    }

    return [...new Set(keywords)]; // 去重
  } catch (error) {
    console.error(
      `[getLocalizedKeywords] Error for ${marketSlug}/${serviceSlug}/${featureSlug}:`,
      error
    );
    return [];
  }
}

/**
 * 辅助函数：获取市场-服务组合的技术痛点
 * 用于生成差异化的内容段落
 * 安全返回：如果找不到匹配，返回空数组而不是抛出错误
 */
export function getTechnicalPainPoints(
  marketSlug: string,
  serviceSlug: string
): string[] {
  if (!marketSlug || !serviceSlug) {
    return [];
  }

  try {
    const market = getMarketBySlug(marketSlug);
    const service = getServiceBySlug(serviceSlug);

    const painPoints: string[] = [];

    // 市场痛点（安全访问）
    if (market && Array.isArray(market.marketPainPoints)) {
      painPoints.push(...market.marketPainPoints);
    }

    // 服务痛点（安全访问）
    if (service && Array.isArray(service.technicalPainPoints)) {
      painPoints.push(...service.technicalPainPoints);
    }

    return [...new Set(painPoints)]; // 去重
  } catch (error) {
    console.error(
      `[getTechnicalPainPoints] Error for ${marketSlug}/${serviceSlug}:`,
      error
    );
    return [];
  }
}

/**
 * 辅助函数：获取市场-服务组合的转化钩子
 * 用于生成差异化的CTA和转化文案
 * 安全返回：如果找不到匹配，返回空数组而不是抛出错误
 */
export function getConversionHooks(
  marketSlug: string,
  serviceSlug: string
): string[] {
  if (!marketSlug || !serviceSlug) {
    return [];
  }

  try {
    const market = getMarketBySlug(marketSlug);
    const service = getServiceBySlug(serviceSlug);

    const hooks: string[] = [];

    // 市场文化钩子（安全访问）
    if (market && Array.isArray(market.culturalHooks)) {
      hooks.push(...market.culturalHooks);
    }

    // 服务转化钩子（安全访问）
    if (service && Array.isArray(service.conversionHooks)) {
      hooks.push(...service.conversionHooks);
    }

    return [...new Set(hooks)]; // 去重
  } catch (error) {
    console.error(
      `[getConversionHooks] Error for ${marketSlug}/${serviceSlug}:`,
      error
    );
    return [];
  }
}
