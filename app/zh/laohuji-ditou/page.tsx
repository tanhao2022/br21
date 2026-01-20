import { Metadata } from "next";
import Link from "next/link";
import { generateServiceMetadata } from "@/lib/utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata(
    {
      title: "老虎机代投",
      description: "专业的老虎机代投服务，提供完整的广告投放解决方案",
      keywords: ["老虎机代投", "Slot代投", "广告投放", "全球代投"],
      country: "Global",
      countrySlug: "global",
      serviceType: "老虎机代投",
    },
    "laohuji-ditou"
  );
}

export default function LaohujiDitouPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        老虎机代投服务
      </h1>
      <p className="mb-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
        老虎机代投是 slot 代投的另一种表述方式，指的是同一类型的广告投放服务。
      </p>
      <p className="mb-6 text-base leading-7 text-gray-700 dark:text-gray-300">
        如果您想了解详细的代投服务信息，请访问：
      </p>
      <Link
        href="/zh/slot-ditou"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        查看 Slot 代投服务详情
      </Link>
    </div>
  );
}