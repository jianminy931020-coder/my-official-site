/**
 * 统一管理 API 请求：前端只通过这里访问后端
 * 好处：
 * - 以后换线上 API 域名，只改这一处
 * - 统一错误处理
 * - TS 类型集中管理
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// 给出更友好的错误提示：避免你忘了配 env 时一脸懵
if (!API_BASE) {
  throw new Error(
    "Missing NEXT_PUBLIC_API_BASE. Please set it in web/.env.local"
  );
}

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

export type Order = {
  id: string;
  productId: string;
  quantity: number;
  buyerName: string;
  createdAt: number;
};

// 通用请求封装：减少重复代码
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    // 对“官网数据”来说一般不希望 Next 默认缓存导致你看不到更新
    // 后面你想做缓存策略，再按页面调整
    cache: "no-store"
  });

  if (!res.ok) {
    // 尽量拿后端返回的 detail/msg，拿不到再给默认文案
    let detail = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      detail = data.detail || data.msg || detail;
    } catch {}
    throw new Error(detail);
  }

  return res.json();
}

/** GET /products */
export function fetchProducts() {
  return http<Product[]>("/products");
}

/** GET /products/:id */
export function fetchProduct(id: string) {
  return http<Product>(`/products/${id}`);
}

/** POST /orders */
export function createOrder(input: {
  productId: string;
  quantity: number;
  buyerName: string;
}) {
  return http<Order>("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

/** GET /orders */
export function fetchOrders() {
  return http<Order[]>("/orders");
}
