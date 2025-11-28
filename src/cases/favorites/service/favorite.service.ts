import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "../../categories/category.service";
import { Favorite } from "../entities/favorites.entity";
import { CreateFavoriteDTO } from "../dto/create-favorite.dto";

@Injectable()
export class FavoriteService {

    constructor(
        @InjectRepository(Favorite)
        private readonly repository: Repository<Favorite>
    ) { }

    async findAll(): Promise<Favorite[]> {
        return this.repository.find()
    }

    async findById(id: string): Promise<Favorite> {
        const found = await this.repository.findOneBy({ id });
        if (!found) throw new HttpException('Produto favorito não encontrado', HttpStatus.NOT_FOUND); 
        else return found
    }

    save(favorite: CreateFavoriteDTO): Promise<Favorite> {
        return this.repository.save({
            customer: { id: favorite.customerId },
            product: { id: favorite.productId }
        });
    }

    async update(id: string, Favorite: Favorite): Promise<Favorite> {
        await this.findById(id)
        
        Favorite.id = id

        return this.repository.save(Favorite)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}