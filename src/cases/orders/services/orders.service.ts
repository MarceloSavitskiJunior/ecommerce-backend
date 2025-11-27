import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderStatus } from "../entities/order.entity";
import { Customer } from "src/cases/customer/entities/customer.entity";
import { CreateOrderDto } from "../dtos/create-order-dto";
import { OrderItem } from "../entities/order-item.entity";
import { Product } from "src/cases/products/entities/product.entity";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }
  
  async create(dto: CreateOrderDto) {
    const customer = await this.customerRepo.findOne({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
    }

    const order = this.orderRepo.create({
      customer,
      total: 0,
      shipping: 0,
      status: OrderStatus.NEW,
      itens: [],
    });

    const savedOrder = await this.orderRepo.save(order);

    let total = 0;

    for (const item of dto.itens) {

      const product = await this.productRepo.findOne({ where: { id: item.productId } });

      if (!product) throw new Error("Produto não encontrado");

      const itemTotal = item.quantity * 10;

      const orderItem = this.orderItemRepo.create({
        order: savedOrder,
        product: product,
        quantity: item.quantity,
        total: itemTotal,
      });

      await this.orderItemRepo.save(orderItem);

      total += itemTotal;
    }

    savedOrder.total = total;
    await this.orderRepo.save(savedOrder);

    return savedOrder;
  }
}
