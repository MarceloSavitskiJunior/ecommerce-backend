import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/cases/products/entities/product.entity";
import { Favorite } from "../entities/favorites.entity";
import { FavoriteService } from "../service/favorite.service";
import { FavoritesController } from "../controller/favorites.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
  ],
  providers: [FavoriteService],
  controllers: [FavoritesController],
  exports: [FavoriteService],
})
export class FavoriteModule {}
