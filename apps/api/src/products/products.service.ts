import { Injectable, NotFoundException } from "@nestjs/common";

/**
 * 练手版本：用内存数组当“数据库”
 * 后面你想换 Mongo/Postgres，只要把这层换掉即可
 */
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: "p1",
      name: "Proxies Booster",
      price: 199,
      description: "稳定代理管理与健康检查，适合自动化任务。",
      features: ["健康检查", "自动轮换", "失败熔断"]
    },
    {
      id: "p2",
      name: "Task Center",
      price: 299,
      description: "任务编排与进度追踪，适合自动化平台。",
      features: ["任务队列", "进度面板", "错误归一化"]
    }
  ];

  list() {
    // 返回所有产品（生产中通常分页）
    return this.products;
  }

  getById(id: string) {
    const p = this.products.find(x => x.id === id);
    if (!p) throw new NotFoundException("Product not found");
    return p;
  }
}

