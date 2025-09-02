import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req } from "@nestjs/common";
import { CityService } from "../services/city.service";
import { City } from "../entities/city.entity";

@Controller('cities')
export class CityController {

    constructor(private readonly service: CityService) {}

    @Get()
    async findAll(): Promise<City[]> {
        return this.service.findAll()
    }

    @Get("/:id")
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<City> {
        return await this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() category: City): Promise<City> {
        return await this.service.save(category)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() category: City
    ): Promise<City> {
        return await this.service.update(id, category)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.delete(id)
    }
}