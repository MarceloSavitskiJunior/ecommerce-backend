import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingController } from "../controller/rating.controller";
import { Rating } from "../entities/rating.entity";
import { RatingService } from "../service/rating.service";
import { Customer } from "src/cases/customer/entities/customer.entity";
import { Product } from "src/cases/products/entities/product.entity";
import { Order } from "src/cases/orders/entities/order.entity";
import { ProductModule } from "src/cases/products/product.module";
import { CustomerModule } from "src/cases/customer/modules/customer.module";
import { OrderModule } from "src/cases/orders/modules/order.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating, Order, Product, Customer]),
    OrderModule,
    ProductModule,
    CustomerModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
