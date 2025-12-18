import Link from "next/link";
import { fetchProduct } from "@/lib/api";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // ✅ 在 Next 16 的 RSC 环境里，params 需要 await 才能拿到值
    const { id } = await params;

    console.log("Product id =", id);

    const p = await fetchProduct(id);

    return (
        <div className="space-y-6">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
                ← 返回首页
            </Link>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.name}</h1>
                        <p className="max-w-2xl text-slate-600">{p.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {p.features.map((f) => (
                                <span
                                    key={f}
                                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                                >
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 md:w-80">
                        <div className="text-sm text-slate-600">价格</div>
                        <div className="mt-1 text-3xl font-semibold">${p.price}</div>

                        <Link
                            href={`/purchase?productId=${p.id}`}
                            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            立即购买
                        </Link>

                        <div className="mt-3 text-xs text-slate-500">
                            这是练手项目的下单流程，后续可接真实支付或链上购买。
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
