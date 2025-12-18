import Link from "next/link";
import { fetchProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await fetchProducts();
  const serverTime = new Date().toISOString();

  return (
    <div className="space-y-10">
      <p className="text-xs text-slate-500">
        SSR Server Time: <span className="font-mono">{serverTime}</span>
      </p>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-slate-100" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-50" />

        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              Next.js + NestJS + Vercel
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              Official Website Starter
            </p>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              一个“像官网”的练手项目
              <span className="text-slate-500">：产品展示、详情、购买与记录</span>
            </h1>

            <p className="text-slate-600">
              目标是跑通官网最常见链路：从展示到下单，再到记录沉淀。后续你可以接真实支付或链上购买。
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#products"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                立即查看产品
              </Link>
              <Link
                href="/records"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                查看购买记录
              </Link>
            </div>
          </div>

          {/* 右侧小卖点 */}
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            {[
              { title: "页面结构清晰", desc: "App Router + 组件分层，后期易扩展" },
              { title: "API 统一封装", desc: "lib/api.ts 统一管理请求与错误处理" },
              { title: "可直接上 Vercel", desc: "前端一键部署，后端可上 VPS/Render" }
            ].map((x) => (
              <div key={x.title} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="font-medium">{x.title}</div>
                <div className="mt-1 text-sm text-slate-600">{x.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品区 */}
      <section id="products" className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">产品</h2>
            <p className="text-sm text-slate-600">选择一个产品查看详情并下单。</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{p.description}</div>
                </div>
                <div className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
                  ${p.price}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.features.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`/products/${p.id}`}
                  className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  查看详情 →
                </Link>

                <Link
                  href={`/purchase?productId=${p.id}`}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  购买
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
