import React from "react";

/**
 * 菲律宾漏斗与支付专用内容模块
 * 
 * 此组件专门为菲律宾市场设计，包含：
 * - GCash 支付优化
 * - Maya 支付系统
 * - Messenger Bot 漏斗
 * 
 * 用于降低内容相似度，确保菲律宾页面有独特的HTML结构
 */
export default function PhilippinesFunnelSection() {
  return (
    <section className="my-12 rounded-lg border border-purple-200 bg-purple-50 p-8 dark:border-purple-800 dark:bg-purple-900/20">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        菲律宾支付与转化漏斗优化
      </h2>

      <div className="space-y-6">
        {/* GCash 支付优化 */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-2xl">💵</span>
            GCash 支付优化方案
          </h3>
          <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>GCash</strong>是菲律宾最主流的电子钱包，90%的iGaming入金通过GCash完成。BR21针对GCash支付特点进行了深度优化：
          </p>
          <ul className="ml-6 list-disc space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300">
            <li>优化支付页面加载速度（3秒内完成），减少用户跳出</li>
            <li>简化支付流程，减少用户输入步骤，提升支付成功率</li>
            <li>集成GCash API，支持余额查询和实时到账通知</li>
            <li>支付失败时自动触发Messenger Bot追单流程</li>
          </ul>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                支付成功率：85%+
              </p>
              <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                通过优化方案，GCash支付成功率可稳定在85%以上
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                入金率提升：30%-50%
              </p>
              <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                结合Messenger Bot追单，入金率可提升30%-50%
              </p>
            </div>
          </div>
        </div>

        {/* Maya 支付系统 */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-2xl">💳</span>
            Maya (PayMaya) 支付支持
          </h3>
          <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>Maya（原PayMaya）</strong>是菲律宾第二大电子钱包，BR21同样提供完整的Maya支付优化方案：
          </p>
          <ul className="ml-6 list-disc space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300">
            <li>支持Maya钱包余额支付和银行卡绑定支付</li>
            <li>提供7-11便利店充值引导（Maya充值码）</li>
            <li>支付失败时自动切换到GCash或其他支付方式</li>
            <li>实时支付状态同步，确保数据准确对齐</li>
          </ul>
        </div>

        {/* Messenger Bot 漏斗 */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-2xl">🤖</span>
            Messenger Bot 自动化漏斗
          </h3>
          <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>Messenger Bot</strong>是BR21在菲律宾市场的核心转化工具，通过自动化追单系统，将转化率提升30%-50%：
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-5 dark:from-blue-900/20 dark:to-purple-900/20">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                📱 注册后15分钟未充值
              </h4>
              <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                Messenger Bot自动推送新手礼包消息，利用"损失厌恶"心理，刺激用户完成首次充值。实测转化率提升40%+。
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-5 dark:from-green-900/20 dark:to-blue-900/20">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                ❌ 支付失败自动追单
              </h4>
              <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                当GCash支付失败时，Bot自动发送替代方案（如7-11充值、Maya支付），并提供专属优惠码，提升二次支付成功率。
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-5 dark:from-purple-900/20 dark:to-pink-900/20">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                🎯 私域运营与复购
              </h4>
              <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                将用户沉淀到Messenger私域，通过定期推送游戏活动、充值优惠，提升用户LTV（生命周期价值）。菲律宾市场LTV为全球最高。
              </p>
            </div>
          </div>
          <div className="mt-4 rounded bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              💡 关键洞察：菲律宾用户对Messenger信任度高，通过Bot自动化追单，转化率比传统邮件/SMS高3-5倍。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
