import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list() {
    // GET /products
    return this.products.list();
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    console.log("Product detail request for ID:", id);
    // GET /products/:id
    return this.products.getById(id);
  }
}
