import React from "react";
import QuickAnswer from "./QuickAnswer";
import KeyPoints from "./KeyPoints";
import RiskNotes from "./RiskNotes";
import ProcessFlow from "./ProcessFlow";
import FAQ from "./FAQ";
import CTA from "./CTA";
import { MDXFrontMatter } from "@/lib/utils/mdx";

interface ArticleLayoutProps {
  frontMatter: MDXFrontMatter;
  content: React.ReactNode;
}

export default function ArticleLayout({ frontMatter, content }: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        {frontMatter.title}
      </h1>

      {frontMatter.quickAnswer && (
        <QuickAnswer content={frontMatter.quickAnswer} />
      )}

      {frontMatter.keyPoints && <KeyPoints items={frontMatter.keyPoints} />}

      {frontMatter.process && <ProcessFlow steps={frontMatter.process} />}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content}
      </div>

      {frontMatter.risks && <RiskNotes items={frontMatter.risks} />}

      {frontMatter.faq && <FAQ items={frontMatter.faq} />}

      <CTA />
    </article>
  );
}