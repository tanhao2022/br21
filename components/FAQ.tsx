import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <div className="my-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        常见问题
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <summary className="cursor-pointer text-lg font-semibold text-gray-900 marker:text-blue-500 dark:text-gray-100">
              {item.question}
            </summary>
            <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
              <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}