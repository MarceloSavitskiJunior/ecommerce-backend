import { City } from "src/cases/cities/entities/city.entity";
import { Customer } from "src/cases/customer/entities/customer.entity";
import { Product } from "src/cases/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity('favorites')
export class Favorite {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { eager: true, nullable: false })
    @JoinColumn({ name: 'customerId' })
    customer: Customer;
    
    @ManyToOne(() => Product, { eager: true, nullable: false })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}