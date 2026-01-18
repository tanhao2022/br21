import React from "react";
import Link from "next/link";

interface CTAProps {
  text?: string;
  href?: string;
}

export default function CTA({
  text = "联系我们了解更多",
  href = "/zh/about",
}: CTAProps) {
  return (
    <div className="my-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center shadow-lg dark:from-blue-700 dark:to-blue-800">
      <h2 className="mb-4 text-2xl font-bold text-white">
        准备好开始了吗？
      </h2>
      <p className="mb-6 text-lg text-blue-100">{text}</p>
      <Link
        href={href}
        className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-700"
      >
        立即咨询
      </Link>
    </div>
  );
}