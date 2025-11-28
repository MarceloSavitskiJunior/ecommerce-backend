import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import type { CreateRatingDTO } from "../dto/create-rating.dto";
import { RatingService } from "../service/rating.service";

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() body: CreateRatingDTO) {
    return this.ratingService.create(body);
  }

  @Get('product/:productId')
  findProductRatings(@Param('productId') productId: string) {
    return this.ratingService.findByProduct(productId);
  }

  @Get('purchased/:customerId')
  getPurchased(@Param('customerId') customerId: string) {
    return this.ratingService.getPurchasedProducts(customerId);
  }
}
