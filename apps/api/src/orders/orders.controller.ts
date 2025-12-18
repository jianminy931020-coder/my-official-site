import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    // POST /orders
    return this.orders.create(dto);
  }

  @Get()
  list() {
    // GET /orders
    return this.orders.list();
  }
}
