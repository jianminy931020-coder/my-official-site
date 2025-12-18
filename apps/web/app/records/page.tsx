import Link from "next/link";
import { fetchOrders } from "@/lib/api";

/**
 * 记录页：展示订单列表
 * Server Component：直接服务端拉数据渲染
 */
export default async function RecordsPage() {
  const orders = await fetchOrders();

  return (
    <main>
      <Link href="/">← 返回首页</Link>
      <h1 style={{ marginTop: 12 }}>购买记录</h1>

      {orders.length === 0 ? (
        <p>暂无记录</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {orders.map((o) => (
            <li key={o.id} style={{ marginBottom: 14 }}>
              <div>
                <b>订单号：</b>{o.id}
              </div>
              <div>产品：{o.productId}</div>
              <div>购买人：{o.buyerName}</div>
              <div>数量：{o.quantity}</div>
              <div>时间：{new Date(o.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
