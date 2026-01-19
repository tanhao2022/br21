import Link from "next/link";
import type { Metadata } from "next";
import { Send } from "lucide-react";

export const metadata: Metadata = {
  title: "首页",
  description: "BR21 - 专业的slot类项目广告投放服务，专注巴西市场",
};

const hotMarkets = [
  {
    name: "印度",
    flag: "🇮🇳",
    description: "印度 Rummy & Teen Patti 投放专家",
    href: "/zh/india-rummy-uac",
  },
  {
    name: "印尼",
    flag: "🇮🇩",
    description: "印尼 Slot Gacor 霸屏推广",
    href: "/zh/indonesia-slot-gacor",
  },
  {
    name: "菲律宾",
    flag: "🇵🇭",
    description: "菲律宾 JILI/FC 电子代投",
    href: "/zh/philippines-jili-gcash",
  },
  {
    name: "越南",
    flag: "🇻🇳",
    description: "越南 Tài Xỉu & Nổ Hũ 代投",
    href: "/zh/vietnam-tai-xiu-ads",
  },
];

const experts = [
  {
    name: "马总监 (Director Ma)",
    role: "东南亚区域总经理 / 统管72人团队",
    desc: "跨境流量战略家。统筹东南亚战区资源，拥有极强跨国调配能力。多次帮助客户从0到1建立品牌壁垒。",
    stats: ["年度管理预算 $1.2亿", "团队人效 Top 1%", "助15家客户上市"],
    highlight: true,
  },
  {
    name: "奥德彪 (Odysseus)",
    role: "巴西区首席总监 / 团队18人",
    desc: "巴西市场破局者。擅长复杂环境风控与支付优化，被誉为「封号风暴中的定海神针」。",
    stats: ["累计消耗 $5000万+", "单一爆款ROI 185%", "PIX支付优化 92%"],
  },
  {
    name: "米莱狄 (Milady)",
    role: "菲律宾首席优化师 / 团队10人",
    desc: "马尼拉转化女王。主导「红蓝白」素材体系，对GCash用户心理有精准洞察。",
    stats: ["月均消耗 $800万", "CTR 4.2%", "马甲包存活 95%"],
  },
  {
    name: "巴特菲 (Batfei)",
    role: "印度区运营总监 / 团队32人",
    desc: "十亿级流量操盘手。排灯节单日抗压10万+新增，擅长Rummy赛道规模化扩张。",
    stats: ["累计获客 500万+", "Day-3留存 35%", "CPI降低 40%"],
  },
  {
    name: "贝索思 (Bezos)",
    role: "印尼区增长黑客 / 团队12人",
    desc: "数据狙击手。独创分岛屿分时段投放模型，极大降低无效流量占比。",
    stats: ["季度消耗涨 300%", "拦截无效流量 99%", "充值渗透 12%"],
  },
];

export default function ZhHome() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
          欢迎来到 BR21
        </h1>
        <p className="mb-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
          专业的slot类项目广告投放服务，专注巴西市场，面向中文客户。
        </p>

        {/* CTA Button */}
        <div className="mb-12">
          <Link
            href="https://t.me/youfa8577"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Send className="h-5 w-5" />
            <span>立即咨询专家</span>
          </Link>
        </div>

        {/* Hero Cards - 确保与下方4个卡片总宽度对齐 */}
        <div className="mb-12 flex gap-6">
          <Link
            href="/zh/brazil-slot-ditou"
            className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              巴西老虎机代投
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              了解巴西市场的slot广告投放服务
            </p>
          </Link>

          <Link
            href="/zh/slot-ditou"
            className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Slot代投服务
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              全面的slot类项目广告投放解决方案
            </p>
          </Link>
        </div>

        {/* 热门市场板块 - 增加上方间距 */}
        <div className="mt-24 mb-8">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
            热门市场
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hotMarkets.map((market) => (
              <Link
                key={market.href}
                href={market.href}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 text-4xl">{market.flag}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {market.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {market.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 专家团队板块 - 全宽背景 */}
      <div className="w-full bg-gray-50 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 text-center">
            <h2 className="mb-3 text-4xl font-bold text-gray-900 dark:text-gray-100">
              资深投放专家团队
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              人均3年+Slot深耕经验，管理过亿美金预算
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert, index) => (
              <div
                key={index}
                className={`group relative rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 ${
                  expert.highlight
                    ? "border-2 border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : "border-gray-200"
                }`}
              >
                {expert.highlight && (
                  <div className="absolute -top-3 left-6 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                    金牌总监
                  </div>
                )}

                {/* 头像占位符 */}
                <div className="mb-4 flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 10}`}
                      alt={expert.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {expert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {expert.role}
                    </p>
                  </div>
                </div>

                {/* 描述 */}
                <p className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {expert.desc}
                </p>

                {/* 数据统计 */}
                <div className="space-y-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                  {expert.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}