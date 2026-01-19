"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { sendGAEvent } from "@/lib/gtag";

export default function HeroCTA() {
  const handleClick = () => {
    sendGAEvent("click_contact_tg", "lead_generation", "hero_section_cta");
  };

  return (
    <Link
      href="https://t.me/youfa8577"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      <Send className="h-5 w-5" />
      <span>立即咨询专家</span>
    </Link>
  );
}
