import React from "react";

interface KeyPointsProps {
  items: string[];
}

export default function KeyPoints({ items }: KeyPointsProps) {
  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        核心要点
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          >
            <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <span className="text-base leading-7 text-gray-700 dark:text-gray-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}