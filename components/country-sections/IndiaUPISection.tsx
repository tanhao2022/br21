import React from "react";

/**
 * 印度 UPI 支付专用内容模块
 */
export default function IndiaUPISection() {
  return (
    <section className="my-12 rounded-lg border border-orange-200 bg-orange-50 p-8 dark:border-orange-800 dark:bg-orange-900/20">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        印度 UPI 支付与 PWA 技术方案
      </h2>
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            UPI / Paytm 支付优化
          </h3>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            BR21针对印度UPI和Paytm支付系统进行深度优化，解决网络延迟和用户犹豫导致的支付掉单问题。
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            PWA 技术规避审核
          </h3>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            使用PWA技术无需上架Google Play，用户点击广告后直接安装，体验和原生APP一模一样，但完全不受商店审核限制。
          </p>
        </div>
      </div>
    </section>
  );
}
