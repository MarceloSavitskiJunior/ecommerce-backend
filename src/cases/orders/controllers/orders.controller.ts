import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req } from "@nestjs/common";
import { CustomerService } from "src/cases/customer/services/customer.service";
import { OrderService } from "../services/orders.service";
import { CreateOrderDto } from "../dtos/create-order-dto";
import { Order } from "../entities/order.entity";

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrderService) {}

    @Post()
    async createOrder(@Body() body: CreateOrderDto) {
        return this.ordersService.create(body);
    }

    @Get()
    async findAll(): Promise<Order[]> {
      return this.ordersService.findAll()
    }

}