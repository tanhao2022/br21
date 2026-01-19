"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const marketSolutions = {
    "拉美市场": [
      { name: "巴西", href: "/zh/brazil-slot-ditou", flag: "🇧🇷" },
      { name: "墨西哥", href: "/zh/mexico-slot-ads", flag: "🇲🇽" },
    ],
    "亚洲市场": [
      { name: "印度", href: "/zh/india-rummy-uac", flag: "🇮🇳" },
      { name: "印尼", href: "/zh/indonesia-slot-gacor", flag: "🇮🇩" },
      { name: "菲律宾", href: "/zh/philippines-jili-gcash", flag: "🇵🇭" },
      { name: "越南", href: "/zh/vietnam-tai-xiu-ads", flag: "🇻🇳" },
      { name: "孟加拉", href: "/zh/bangladesh-betting-traffic", flag: "🇧🇩" },
    ],
    "非洲市场": [
      { name: "尼日利亚", href: "/zh/nigeria-slot-ads", flag: "🇳🇬" },
    ],
  };

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/zh"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            BR21
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/zh"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              首页
            </Link>

            {/* 市场解决方案下拉菜单 */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                市场解决方案
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="py-2">
                    {/* 拉美市场 */}
                    <div className="px-3 py-2">
                      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        拉美市场
                      </div>
                      {marketSolutions["拉美市场"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="mr-2 text-lg">{item.flag}</span>
                          <span>{item.name}</span>
                          {item.name === "巴西" && (
                            <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">
                              Hot
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* 分隔线 */}
                    <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>

                    {/* 亚洲市场 */}
                    <div className="px-3 py-2">
                      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        亚洲市场
                      </div>
                      {marketSolutions["亚洲市场"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="mr-2 text-lg">{item.flag}</span>
                          <span>{item.name}</span>
                          {["印度", "印尼", "菲律宾", "越南"].includes(item.name) && (
                            <span className="ml-auto text-xs text-orange-500 dark:text-orange-400">
                              Hot
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* 分隔线 */}
                    <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>

                    {/* 非洲市场 */}
                    <div className="px-3 py-2">
                      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        非洲市场
                      </div>
                      {marketSolutions["非洲市场"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="mr-2 text-lg">{item.flag}</span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/zh/about"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              关于我们
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
