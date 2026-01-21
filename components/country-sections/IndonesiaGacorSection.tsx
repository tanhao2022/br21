import React from "react";

/**
 * 印尼 Gacor 专用内容模块
 */
export default function IndonesiaGacorSection() {
  return (
    <section className="my-12 rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-900/20">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        印尼 Slot Gacor 与 KOL 直播带玩
      </h2>
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Slot Gacor 语义优化
          </h3>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            "Gacor"在印尼语中意为"容易爆奖"，是印尼Slot玩家最常用的搜索关键词。BR21通过Gacor语义优化、素材本地化，提升Gacor相关关键词排名。
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            KOL 直播带玩转化
          </h3>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            BR21签约50+印尼本地Slot主播，通过直播带玩（展示真实爆奖过程），挂上专属下载链接。实测CTR提升300%，留存率极高。
          </p>
        </div>
      </div>
    </section>
  );
}
