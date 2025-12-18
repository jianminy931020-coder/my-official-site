import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

export type Order = {
  id: string;
  productId: string;
  quantity: number;
  buyerName: string;
  createdAt: number;
};

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];

  create(dto: CreateOrderDto) {
    const order: Order = {
      id: `o_${Date.now()}`,
      productId: dto.productId,
      quantity: dto.quantity,
      buyerName: dto.buyerName,
      createdAt: Date.now()
    };
    this.orders.unshift(order);
    return order;
  }

  list() {
    return this.orders;
  }
}
