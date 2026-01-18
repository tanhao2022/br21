import React from "react";

interface RiskNotesProps {
  items: string[];
}

export default function RiskNotes({ items }: RiskNotesProps) {
  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        风险提示
      </h2>
      <div className="space-y-3 rounded-lg border-2 border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 text-base leading-7 text-amber-900 dark:text-amber-100"
          >
            <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-white">
              ⚠
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}