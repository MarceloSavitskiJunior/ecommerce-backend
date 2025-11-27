import { DeleteResult, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../entities/customer.entity";

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(Customer)
        private readonly repository: Repository<Customer>,
    ) { }

    findAll(): Promise<Customer[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Customer> {
        const found = await this.repository.findOneBy({ id });
        if (!found) throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND); 
        else return found
    }

    save(customer: Customer): Promise<Customer> {
        return this.repository.save(customer)
    }

    async update(id: string, customer: Customer): Promise<Customer> {
        await this.findById(id)
        
        customer.id = id

        return this.repository.save(customer)
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }

    async findBySupabaseId(supabaseId: string) {
        return this.repository.findOne({ where: { supabaseId } });
    }

}