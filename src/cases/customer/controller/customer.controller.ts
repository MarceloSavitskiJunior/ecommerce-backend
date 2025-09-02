import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req } from "@nestjs/common";
import { Customer } from "../entities/customer.entity";
import { CustomerService } from "../services/customer.service";

@Controller('customers')
export class CustomerController {

    constructor(private readonly service: CustomerService) {}

    @Get()
    async findAll(): Promise<Customer[]> {
        return this.service.findAll()
    }

    @Get("/:id")
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
        return await this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() category: Customer): Promise<Customer> {
        return await this.service.save(category)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() category: Customer
    ): Promise<Customer> {
        return await this.service.update(id, category)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.delete(id)
    }
}