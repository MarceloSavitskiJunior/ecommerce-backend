import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "../entities/city.entity";

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly repository: Repository<City>,
    ) { }

    findAll(): Promise<City[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<City> {
        const found = await this.repository.findOneBy({ id });
        if (!found) throw new HttpException('Cidade não encontrada', HttpStatus.NOT_FOUND); 
        else return found
    }

    save(city: City): Promise<City> {
        return this.repository.save(city)
    }

    async update(id: string, city: City): Promise<City> {
        await this.findById(id)
        
        city.id = id

        return this.repository.save(city)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}