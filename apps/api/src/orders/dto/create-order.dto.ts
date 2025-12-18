import { IsInt, IsString, Min } from "class-validator";

/**
 * DTO：定义“创建订单”入参结构
 * class-validator 会自动校验请求体
 */
export class CreateOrderDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsString()
  buyerName!: string;
}
