import { Controller, Get, Param, ParseUUIDPipe, Req } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController {

    constructor(private readonly service: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.service.findAll()
    }

    @Get("/:id")
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
        return await this.service.findById(id);
    }
}