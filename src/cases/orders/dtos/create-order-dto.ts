export class CreateOrderDto {
  customerId: string;
  itens: {
    productId: string;
    quantity: number;
  }[];
}
