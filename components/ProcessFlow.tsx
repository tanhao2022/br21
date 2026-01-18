import React from "react";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
}

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="my-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        操作流程
      </h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-4">
            {index < steps.length - 1 && (
              <div className="absolute left-5 top-12 h-full w-0.5 bg-gray-300 dark:bg-gray-600" />
            )}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-lg font-semibold text-white">
              {index + 1}
            </div>
            <div className="flex-1 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}