import React from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  canonical,
}: SEOProps) {
  const fullTitle = title.includes("BR21") ? title : `${title} | BR21`;
  const defaultOgImage = "/og-image.jpg";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical || ""} />

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
    </>
  );
}

export function generateJSONLD({
  title,
  description,
  author = "BR21",
}: {
  title: string;
  description: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: author,
    },
    inLanguage: "zh-CN",
  };
}

interface ServiceSchemaOptions {
  serviceType: string;
  serviceName: string;
  description: string;
  areaServed?: string[];
  offers?: Array<{
    name: string;
    description?: string;
  }>;
}

export function generateServiceSchema({
  serviceType,
  serviceName,
  description,
  areaServed = ["Brazil", "Philippines", "India", "Indonesia", "Vietnam"],
  offers = [
    {
      name: "Facebook Slot Ads",
      description: "Facebook和Instagram平台的slot类项目广告投放服务",
    },
    {
      name: "Google Slot Ads",
      description: "Google Ads平台的slot类项目广告投放服务",
    },
    {
      name: "Account Management",
      description: "广告账户注册、管理和维护服务",
    },
    {
      name: "Strategy Planning",
      description: "广告投放策略制定和优化服务",
    },
  ],
}: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceType,
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "BR21",
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Country",
      name: area,
    })),
    audience: {
      "@type": "BusinessAudience",
      audienceType: "iGaming Operators",
      geographicArea: {
        "@type": "Country",
        name: "China",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "代投服务",
      itemListElement: offers.map((offer, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.description || "",
        },
      })),
    },
    inLanguage: "zh-CN",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://br21.com",
    },
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqItems: FAQItem[]) {
  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}