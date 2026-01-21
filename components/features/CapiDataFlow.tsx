"use client";

import React from "react";
import { ArrowRight, Server, Database, Zap } from "lucide-react";

/**
 * CapiDataFlow - CAPI 数据流可视化
 * 
 * SVG流程图动画，显示数据从服务器到Facebook/Google API的流动
 * 用于打破DOM结构重复，为CAPI相关页面提供独特的视觉元素
 */
export default function CapiDataFlow() {
  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Conversions API 数据流
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          服务器端回传 · 实时数据同步
        </p>
      </div>

      {/* SVG 流程图 */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-900/20 dark:to-purple-900/20">
        <svg
          viewBox="0 0 800 300"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 数据流动画路径 */}
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3">
                <animate
                  attributeName="stop-opacity"
                  values="0.3;1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1">
                <animate
                  attributeName="stop-opacity"
                  values="1;0.3;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3">
                <animate
                  attributeName="stop-opacity"
                  values="0.3;1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          {/* 服务器节点 */}
          <g>
            <rect
              x="50"
              y="100"
              width="120"
              height="100"
              rx="8"
              fill="#3b82f6"
              className="drop-shadow-lg"
            />
            <foreignObject x="50" y="100" width="120" height="100">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <Server className="h-8 w-8 mb-2" />
                <span className="text-sm font-semibold">服务器</span>
                <span className="text-xs mt-1">Server</span>
              </div>
            </foreignObject>
          </g>

          {/* 箭头1 */}
          <g>
            <path
              d="M 170 150 L 270 150"
              stroke="url(#flowGradient)"
              strokeWidth="4"
              fill="none"
              markerEnd="url(#arrowhead)"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,200;200,0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <ArrowRight className="absolute left-[270px] top-[142px] h-4 w-4 text-blue-500 animate-pulse" />
          </g>

          {/* CAPI 处理节点 */}
          <g>
            <rect
              x="290"
              y="100"
              width="120"
              height="100"
              rx="8"
              fill="#8b5cf6"
              className="drop-shadow-lg"
            />
            <foreignObject x="290" y="100" width="120" height="100">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <Zap className="h-8 w-8 mb-2" />
                <span className="text-sm font-semibold">CAPI</span>
                <span className="text-xs mt-1">转换API</span>
              </div>
            </foreignObject>
          </g>

          {/* 箭头2 */}
          <g>
            <path
              d="M 410 150 L 510 150"
              stroke="url(#flowGradient)"
              strokeWidth="4"
              fill="none"
              markerEnd="url(#arrowhead)"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,200;200,0"
                dur="2s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </path>
            <ArrowRight className="absolute left-[510px] top-[142px] h-4 w-4 text-purple-500 animate-pulse" />
          </g>

          {/* 平台节点 */}
          <g>
            <rect
              x="530"
              y="50"
              width="120"
              height="80"
              rx="8"
              fill="#10b981"
              className="drop-shadow-lg"
            />
            <foreignObject x="530" y="50" width="120" height="80">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <Database className="h-6 w-6 mb-1" />
                <span className="text-xs font-semibold">Facebook</span>
              </div>
            </foreignObject>
          </g>

          <g>
            <rect
              x="530"
              y="170"
              width="120"
              height="80"
              rx="8"
              fill="#f59e0b"
              className="drop-shadow-lg"
            />
            <foreignObject x="530" y="170" width="120" height="80">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <Database className="h-6 w-6 mb-1" />
                <span className="text-xs font-semibold">Google</span>
              </div>
            </foreignObject>
          </g>

          {/* 箭头定义 */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 数据流说明 */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="mb-2 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              服务器端收集
            </span>
          </div>
          <p className="text-xs leading-5 text-blue-700 dark:text-blue-300">
            用户行为数据在服务器端实时收集，不受浏览器限制
          </p>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-900 dark:text-purple-100">
              CAPI 转换
            </span>
          </div>
          <p className="text-xs leading-5 text-purple-700 dark:text-purple-300">
            数据通过 Conversions API 实时转换和验证
          </p>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="mb-2 flex items-center gap-2">
            <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-900 dark:text-green-100">
              平台同步
            </span>
          </div>
          <p className="text-xs leading-5 text-green-700 dark:text-green-300">
            数据同步到 Facebook/Google，提升机器学习优化效果
          </p>
        </div>
      </div>

      {/* 优势说明 */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
          <strong>服务器端回传优势：</strong>
          Conversions API 确保数据准确对齐，回传准确率提升至95%以上。不受浏览器限制、Cookie政策影响，让算法更精准地找到高价值用户，ROI提升20%-30%。
        </p>
      </div>
    </div>
  );
}
