import { Customer } from "src/cases/customer/entities/customer.entity";
import { Product } from "src/cases/products/entities/product.entity";

export interface RatingDTO {
  id: string;
  rating: number;
  comment?: string;
  product: Product;
  customer: Customer;
}
