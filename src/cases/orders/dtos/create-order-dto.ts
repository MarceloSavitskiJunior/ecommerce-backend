export class CreateOrderDto {
  supabaseId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
