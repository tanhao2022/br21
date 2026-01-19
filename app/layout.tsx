import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
