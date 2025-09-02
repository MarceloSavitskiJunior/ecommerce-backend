import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req } from "@nestjs/common";
import { StateService } from "../services/state.service";
import { State } from "../entities/state.entity";

@Controller('states')
export class StateController {

    constructor(private readonly service: StateService) {}

    @Get()
    async findAll(): Promise<State[]> {
        return this.service.findAll()
    }

    @Get("/:id")
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<State> {
        return await this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() category: State): Promise<State> {
        return await this.service.save(category)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() category: State
    ): Promise<State> {
        return await this.service.update(id, category)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.delete(id)
    }
}