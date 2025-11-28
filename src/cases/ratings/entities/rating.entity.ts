import { Customer } from "src/cases/customer/entities/customer.entity";
import { Product } from "src/cases/products/entities/product.entity";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn,
  Unique
} from "typeorm";

@Entity('ratings')
@Unique(['customer', 'product'])
export class Rating {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, { eager: true, nullable: false })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Product, { eager: true, nullable: false })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'int', width: 1 })
  score: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
