import React from "react";

interface QuickAnswerProps {
  content: string;
}

export default function QuickAnswer({ content }: QuickAnswerProps) {
  return (
    <div className="my-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
      <h2 className="mb-3 text-xl font-semibold text-blue-900 dark:text-blue-100">
        快速解答
      </h2>
      <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
        {content}
      </p>
    </div>
  );
}