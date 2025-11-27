import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "../../categories/category.service";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) { }

    async findAll(categoryId?: string): Promise<Product[]> {
        if (categoryId) {
            const category = await this.categoryService.findById(categoryId)
            return this.repository.find({ 
                where: {category: category},
                relations: ["category", "brand"]
             })
        }
        return this.repository.find({
            relations: ["category", "brand"]
        });
    }

    async findById(id: string): Promise<Product> {
        const found = await this.repository.findOneBy({ id });
        if (!found) throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND); 
        else return found
    }

    save(product: Product): Promise<Product> {
        return this.repository.save(product)
    }

    async update(id: string, product: Product): Promise<Product> {
        await this.findById(id)
        
        product.id = id

        return this.repository.save(product)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}