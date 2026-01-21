"use client";

import React from "react";
import { Shield, CheckCircle2, AlertTriangle, Activity } from "lucide-react";

/**
 * BanShieldMonitor - 账户封禁防护监控
 * 
 * 显示 Cloaking 状态和账户健康度的视觉盾牌UI
 * 用于打破DOM结构重复，为账户防护相关页面提供独特的视觉元素
 */
export default function BanShieldMonitor() {
  const [cloakingStatus, setCloakingStatus] = React.useState<"active" | "standby">("active");
  const accountHealth = 100;
  const activeAccounts = 47;
  const protectedAccounts = 45;

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            账户防护实时监控
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Cloaking 3.0 技术 · 实时防护
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">
            {cloakingStatus === "active" ? "Cloaking Active" : "Standby Mode"}
          </span>
        </div>
      </div>

      {/* 主要盾牌指标 */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="relative">
          {/* 外圈动画 */}
          <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-400 opacity-20"></div>
          <div className="absolute inset-0 animate-pulse rounded-full border-4 border-purple-400 opacity-30"></div>
          
          {/* 盾牌图标 */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-blue-500 bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl dark:border-blue-600 dark:from-blue-600 dark:to-purple-600">
            <Shield className="h-16 w-16 text-white" fill="currentColor" />
          </div>
        </div>

        {/* 账户健康度 */}
        <div className="mt-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Account Health: {accountHealth}%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            所有账户运行正常，无封禁风险
          </p>
        </div>
      </div>

      {/* 状态卡片 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              防护状态
            </span>
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {cloakingStatus === "active" ? "已激活" : "待机中"}
          </div>
          <p className="mt-1 text-xs text-green-700 dark:text-green-300">
            Cloaking 3.0 实时运行
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="mb-2 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              活跃账户
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {activeAccounts}
          </div>
          <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
            正在投放中
          </p>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              受保护账户
            </span>
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {protectedAccounts}
          </div>
          <p className="mt-1 text-xs text-purple-700 dark:text-purple-300">
            白名单账户
          </p>
        </div>
      </div>

      {/* 技术说明 */}
      <div className="mt-6 space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Cloaking 3.0 技术
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
              IP指纹识别、User-Agent分析，在0.01秒内判断访问者，完美规避审核爬虫。即使主页被封，换主页即可继续投放，账户不受影响。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 flex-shrink-0 text-blue-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              白名单账户保障
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
              提供二不限、三不限白名单账户，抗封能力比普通账单户强300%以上。Pixel数据得以保留，确保机器学习优化不受影响。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
