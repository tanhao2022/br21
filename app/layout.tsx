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
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://www.br21.com",
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
    logo: `${baseUrl}/favicon.ico`, // 使用 favicon 作为占位符，待后续添加实际 logo
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
