"use client";

import React from "react";
import { Send } from "lucide-react";

export default function FloatingContact() {
  const handleClick = () => {
    window.open("https://t.me/youfa8577", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 呼吸灯动画背景层 */}
      <div className="absolute inset-0 animate-ping rounded-full bg-[#0088cc] opacity-20"></div>
      <div className="absolute inset-0 animate-pulse rounded-full bg-[#0088cc] opacity-30"></div>
      
      {/* 主按钮 */}
      <button
        onClick={handleClick}
        className="group relative flex items-center gap-3 rounded-full bg-[#0088cc] px-6 py-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
        aria-label="联系代投"
      >
        {/* 图标 */}
        <Send className="h-6 w-6 text-white transition-transform group-hover:translate-x-1" />
        
        {/* 文字标签 */}
        <span className="text-base font-semibold text-white">
          联系代投
        </span>
      </button>
    </div>
  );
}