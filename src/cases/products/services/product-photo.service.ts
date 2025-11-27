import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "../../categories/category.service";
import { Product } from "../entities/product.entity";
import { ProductPhoto } from "../entities/product-photo.entity";

@Injectable()
export class ProductPhotoService {

    constructor(
        @InjectRepository(ProductPhoto)
        private readonly repository: Repository<ProductPhoto>
    ) { }

    async findAll(product?: Product): Promise<ProductPhoto[]> {
        if (!product) {
            return this.repository.find();
        }
        return this.repository.find({
            where: { product: product },
            relations: ["product"]
        });
        
    }

    async findById(id: string): Promise<ProductPhoto> {
        const found = await this.repository.findOneBy({ id });
        if (!found) throw new HttpException('Imagem de produto não encontrado', HttpStatus.NOT_FOUND); 
        else return found
    }

    save(product: ProductPhoto): Promise<ProductPhoto> {
        return this.repository.save(product)
    }

    async update(id: string, product: ProductPhoto): Promise<ProductPhoto> {
        await this.findById(id)
        
        product.id = id

        return this.repository.save(product)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}