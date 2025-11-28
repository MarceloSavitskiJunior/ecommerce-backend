import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "src/cases/customer/entities/customer.entity";
import { Product } from "src/cases/products/entities/product.entity";
import { Order } from "src/cases/orders/entities/order.entity";
import { Rating } from "../entities/rating.entity";
import { CreateRatingDTO } from "../dto/create-rating.dto";

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

    async create(data: CreateRatingDTO): Promise<Rating> {
    const { customerId, productId, rating, comment } = data;

    const purchased = await this.hasUserPurchasedProduct(customerId, productId);

    if (!purchased) {
        throw new BadRequestException("Você só pode avaliar produtos comprados.");
    }

    const customer = await this.customerRepo.findOneBy({ id: customerId });
    const product = await this.productRepo.findOneBy({ id: productId });

    if (!customer || !product) {
        throw new BadRequestException("Cliente ou produto inválido.");
    }

    const ratingEntity = this.ratingRepo.create({
        score: rating,
        comment,
        customer,
        product,
    });

    return await this.ratingRepo.save(ratingEntity);
    }

  async findByProduct(productId: string): Promise<Rating[]> {
    return this.ratingRepo.find({
      where: { product: { id: productId } },
      order: { createdAt: 'DESC' }
    });
  }

  async hasUserPurchasedProduct(customerId: string, productId: string): Promise<boolean> {
    const order = await this.orderRepo.findOne({
      where: {
        customer: { id: customerId },
        itens: { product: { id: productId } }
      },
      relations: ['itens', 'itens.product']
    });

    return !!order;
  }

  async getPurchasedProducts(customerId: string): Promise<string[]> {
    const orders = await this.orderRepo.find({
      where: { customer: { id: customerId } },
      relations: ['itens', 'itens.product']
    });

    const productIds = orders.flatMap(o =>
      o.itens.map(i => i.product.id)
    );

    return [...new Set(productIds)];
  }
}
