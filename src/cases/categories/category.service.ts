import { DeleteResult, Repository } from "typeorm";
import { Category } from "./category.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
    ) { }

    findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Category> {
        const found = this.repository.findOneByOrFail({ id: id });
        if (!found) throw new HttpException('Categoria não encontrado', HttpStatus.NOT_FOUND)
        return found
    }

    save(category: Category): Promise<Category> {
        return this.repository.save(category)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}