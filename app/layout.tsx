import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com"
  ),
  title: {
    default: "BR21 | 老虎机代投服务",
    template: "%s | BR21",
  },
  description: "专业的slot类项目广告投放服务，专注巴西市场，面向中文客户",
  keywords: "老虎机代投,slot代投,巴西广告投放,slot广告",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "BR21",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "BR21 - 全球 iGaming 流量增长引擎",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  // 不在此设置 canonical，由各页面自行输出，避免子路由错误继承首页 canonical
  // hreflang: 标记当前站点语言为中文，x-default 指向当前站点（未来添加多语言时扩展）
  alternates: {
    languages: {
      "zh-CN": "https://www.br21.com/zh/",
      "x-default": "https://www.br21.com/zh/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-69WC2TF9H7";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com";

  // 全局 Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BR21",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description:
      "全球 iGaming 流量增长引擎，提供 Facebook、Google 广告投放与风控解决方案。",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Chinese", "English"],
      areaServed: ["CN", "BR", "IN", "ID", "PH", "VN"],
    },
    sameAs: ["https://t.me/youfa8577"],
  };

  // Service Schema - 核心业务服务
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "iGaming 广告投放服务",
    provider: {
      "@type": "Organization",
      name: "BR21",
      url: baseUrl,
    },
    areaServed: [
      { "@type": "Country", name: "Brazil" },
      { "@type": "Country", name: "Philippines" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Indonesia" },
      { "@type": "Country", name: "Vietnam" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "iGaming 广告服务",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Slot 广告代投",
            description: "老虎机类游戏 Facebook、Google 广告投放服务",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rummy 广告代投",
            description: "真金棋牌游戏 Google UAC 广告投放服务",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "支付优化",
            description: "PIX、GCash、UPI 等本地支付成功率优化",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CAPI 回传优化",
            description: "Conversions API 数据回传与归因优化",
          },
        },
      ],
    },
  };

  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* 全局 Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        {/* Google tag (gtag.js) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
