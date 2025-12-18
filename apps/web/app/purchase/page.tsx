import Link from "next/link";
import { fetchOrders } from "@/lib/api";

export default async function RecordsPage() {
  const orders = await fetchOrders();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">购买记录</h1>
          <p className="text-sm text-slate-600">展示最近的下单记录（练手版）。</p>
        </div>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          返回首页
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
          暂无记录。去首页选个产品下单吧。
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-slate-500">订单号</div>
                  <div className="font-mono text-sm">{o.id}</div>
                </div>

                <div className="grid gap-2 text-sm md:grid-cols-3">
                  <div>
                    <div className="text-slate-500">产品</div>
                    <div className="font-medium text-slate-900">{o.productId}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">购买人</div>
                    <div className="font-medium text-slate-900">{o.buyerName}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">数量</div>
                    <div className="font-medium text-slate-900">{o.quantity}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                时间：{new Date(o.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
