import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Req } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductPhoto } from "../entities/product-photo.entity";
import { ProductPhotoService } from "../services/product-photo.service";
import { ProductService } from "../services/product.service";

@Controller('products-photo')
export class ProductPhotoController {

    constructor(
        private readonly service: ProductPhotoService,
        private readonly productService: ProductService
    ) {}

    @Get()
    async findAll(@Query('productId', new ParseUUIDPipe({ optional: true })) productId?: string): Promise<ProductPhoto[]> {
        if (productId) {
            const product = await this.productService.findById(productId)
            return this.service.findAll(product)
        }
        return this.service.findAll()
    }

}