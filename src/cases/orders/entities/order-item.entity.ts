import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/cases/products/entities/product.entity";

enum OrderStatus {
    NEW = 'NEW',
    SEPARATION = 'SEPARATION',
    INVOICED = 'INVOICED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

@Entity('order-item')
export class OrderItem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, (order) => order.itens, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    order: Order;

    @ManyToOne(() => Product, (product) => product.id, { eager: true, nullable: false })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column({ 
        type: 'integer', 
        nullable: false
    })
    quantity: number

    @Column({ 
        type: 'decimal', 
        nullable: false, 
        precision: 10,
        scale: 2 
    })
    total: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}