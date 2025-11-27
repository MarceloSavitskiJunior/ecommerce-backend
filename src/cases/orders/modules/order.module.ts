import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/order-item.entity";
import { Customer } from "src/cases/customer/entities/customer.entity";

import { OrderService } from "../services/orders.service";
import { OrdersController } from "../controllers/orders.controller";
import { Product } from "src/cases/products/entities/product.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Customer,
      Product
    ]),
  ],
  providers: [OrderService],
  controllers: [OrdersController],
  exports: [OrderService],
})
export class OrderModule {}
