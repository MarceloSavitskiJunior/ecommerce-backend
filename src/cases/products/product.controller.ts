import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Req } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";

@Controller('products')
export class ProductController {

    constructor(private readonly service: ProductService) {}

    @Get()
    async findAll(@Query('categoryId', new ParseUUIDPipe({ optional: true })) categoryId?: string): Promise<Product[]> {
        return this.service.findAll(categoryId)
    }

    @Get("/:id")
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        return await this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() category: Product): Promise<Product> {
        return await this.service.save(category)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() category: Product
    ): Promise<Product> {
        return await this.service.update(id, category)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.delete(id)
    }
}