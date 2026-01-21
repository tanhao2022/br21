import React from "react";

/**
 * 巴西合规与支付专用内容模块
 * 
 * 此组件专门为巴西市场设计，包含：
 * - Anatel 合规要求
 * - CPF 验证流程
 * - PIX 支付系统特点
 * 
 * 用于降低内容相似度，确保巴西页面有独特的HTML结构
 */
export default function BrazilComplianceSection() {
  return (
    <section className="my-12 rounded-lg border border-blue-200 bg-blue-50 p-8 dark:border-blue-800 dark:bg-blue-900/20">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        巴西市场合规与支付要求
      </h2>

      <div className="space-y-6">
        {/* Anatel 合规 */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-2xl">📡</span>
            Anatel 合规要求
          </h3>
          <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>Anatel（国家电信局）</strong>是巴西的电信监管机构，对iGaming广告投放有严格的合规要求。BR21确保所有广告素材和落地页完全符合Anatel的广告规范，包括：
          </p>
          <ul className="ml-6 list-disc space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300">
            <li>禁止使用误导性语言和虚假承诺</li>
            <li>必须明确标注风险提示和年龄限制</li>
            <li>广告内容需通过Anatel预审核流程</li>
            <li>域名和服务器需符合巴西本地化要求</li>
          </ul>
        </div>

        {/* CPF 验证 */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-2xl">🆔</span>
            CPF 验证流程
          </h3>
          <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>CPF（Cadastro de Pessoa Física）</strong>是巴西的个人税务登记号，是PIX支付和账户验证的必需信息。BR21的支付系统已深度集成CPF验证：
          </p>
          <ul className="ml-6 list-disc space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300">
            <li>实时CPF格式验证（11位数字，带校验码）</li>
            <li>与巴西联邦税务局（Receita Federal）API对接</li>
            <li>自动检测CPF有效性，减少支付失败率</li>
            <li>CPF验证失败时提供清晰的错误提示</li>
          </ul>
          <div className="mt-4 rounded bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              ⚠️ 重要提示：CPF验证失败是导致PIX支付掉单的主要原因之一。BR21通过优化验证流程，将CPF验证成功率提升至95%以上。
            </p>
          </div>
        </div>

        {/* PIX 支付系统 */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-2xl">💳</span>
            PIX 即时支付系统
          </h3>
          <p className="mb-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>PIX（Instant Payment System）</strong>是巴西央行推出的即时支付系统，支持7x24小时实时到账。BR21针对PIX支付特点进行了深度优化：
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h4 className="mb-2 font-semibold text-green-800 dark:text-green-200">
                ✅ 即时到账优势
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                PIX支付在几秒内完成，无需等待银行清算，极大提升用户体验和转化率。
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                🔄 动态路由技术
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                BR21集成Nubank、Itaú、Bradesco等多家银行，智能切换高成功率通道，支付成功率稳定在85%以上。
              </p>
            </div>
          </div>
          <div className="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-700">
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
              <strong>PIX支付掉单率优化：</strong>通过优化H5支付页加载速度（3秒内）、简化支付流程、实时监控网络状态，BR21将PIX支付掉单率从行业平均的20%-25%降低至15%以下。每提升1%支付成功率，ROI直接提升5%-8%。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
