import { City } from "src/cases/cities/entities/city.entity";
import { Customer } from "src/cases/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

enum OrderStatus {
    NEW = 'NEW',
    SEPARATION = 'SEPARATION',
    INVOICED = 'INVOICED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

@Entity('order')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, (customer) => customer.id, { eager: true, nullable: false })
    @JoinColumn({ name: 'customerId' })
    customerId: Customer;

    @Column({ 
        type: 'decimal', 
        nullable: true, 
        precision: 10, 
        scale: 2 
    })
    shipping: number

    @Column('enum', { enum: OrderStatus, default: OrderStatus.NEW })
    status: string

    @Column({ 
        type: 'decimal', 
        nullable: false, 
        precision: 10,
        scale: 2 
    })
    total: number

    @OneToMany(() => OrderItem, (item) => item.order, {eager: true, cascade: true})
    itens: OrderItem[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}