import React from "react";

/**
 * 越南 Zalo 私域专用内容模块
 */
export default function VietnamZaloSection() {
  return (
    <section className="my-12 rounded-lg border border-yellow-200 bg-yellow-50 p-8 dark:border-yellow-800 dark:bg-yellow-900/20">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        越南 Zalo 私域与 MoMo 支付优化
      </h2>
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Zalo 私域流量池
          </h3>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            将流量存到Zalo私域，不受平台封号影响。通过Zalo群组长期运营，降低获客成本，提升用户LTV。
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            MoMo 支付优化
          </h3>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            BR21通过完善的技术对接和多通道备选，将MoMo支付成功率提升至95%以上，解决支付掉单问题。
          </p>
        </div>
      </div>
    </section>
  );
}
