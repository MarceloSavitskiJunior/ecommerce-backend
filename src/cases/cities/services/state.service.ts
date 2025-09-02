import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { State } from "../entities/state.entity";

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(State)
        private readonly repository: Repository<State>,
    ) { }

    findAll(): Promise<State[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<State> {
        const found = await this.repository.findOneBy({ id });
        if (!found) throw new HttpException('Estado não encontrado', HttpStatus.NOT_FOUND); 
        else return found
    }

    save(state: State): Promise<State> {
        return this.repository.save(state)
    }

    async update(id: string, state: State): Promise<State> {
        await this.findById(id)
        
        state.id = id

        return this.repository.save(state)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}