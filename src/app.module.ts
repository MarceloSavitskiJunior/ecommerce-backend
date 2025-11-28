import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { ProductModule } from './cases/products/product.module';
import { BrandModule } from './cases/brands/brand.module';
import { StateModule } from './cases/cities/modules/city.module';
import { CustomerModule } from './cases/customer/modules/customer.module';
import { SupabaseModule } from './lib/supabase/supabase.module';
import { AuthModule } from './cases/auth/module/auth.module';
import { OrderModule } from './cases/orders/modules/order.module';
import { FavoriteModule } from './cases/favorites/module/favorite.module';
import { RatingModule } from './cases/ratings/module/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: false
    }),
    CategoryModule,
    ProductModule,
    BrandModule,
    StateModule,
    CustomerModule,
    OrderModule,
    AuthModule,
    SupabaseModule,
    FavoriteModule,
    RatingModule
  ],
})
export class AppModule {}

