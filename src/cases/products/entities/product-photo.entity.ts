import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('product-photo')
export class ProductPhoto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    path: string;

    @ManyToOne(() => Product)
    product: Product
}