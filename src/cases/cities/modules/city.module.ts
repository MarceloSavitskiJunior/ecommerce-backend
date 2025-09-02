import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "../entities/city.entity";
import { State } from "../entities/state.entity";
import { StateService } from "../services/state.service";
import { CityService } from "../services/city.service";
import { StateController } from "../controllers/state.controller";
import { CityController } from "../controllers/city.controller";

@Module({
    imports: [TypeOrmModule.forFeature([City, State])],
    providers: [StateService, CityService],
    controllers: [StateController, CityController],
})
export class StateModule {

}   