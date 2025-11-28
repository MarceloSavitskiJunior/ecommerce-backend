import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Req } from "@nestjs/common";
import { Favorite } from "../entities/favorites.entity";
import { FavoriteService } from "../service/favorite.service";

@Controller('favorites')
export class FavoritesController {

    constructor(private readonly service: FavoriteService) {}

    @Get()
    async findAll(): Promise<Favorite[]> {
        return this.service.findAll()
    }

    @Get("/:id")
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Favorite> {
        return await this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() body: { productId: string, customerId: string }): Promise<Favorite> {
        return this.service.save({
            customerId: body.customerId,
            productId: body.productId
        });
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() favorite: Favorite
    ): Promise<Favorite> {
        return await this.service.update(id, favorite)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.delete(id)
    }
}