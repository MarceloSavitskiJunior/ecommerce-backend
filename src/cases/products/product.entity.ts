import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { Brand } from "../brands/brand.entity";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ 
        type: 'text', 
        nullable: true 
    })
    description: string

    @Column({ 
        type: 'decimal', 
        nullable: false, 
        precision: 10, 
        scale: 2 
    })
    price: number

    @Column({ type: 'boolean', nullable: false, default: true })
    active: boolean

    @ManyToOne(() => Category, (category) => category.id, { eager: true, nullable: false })
    @JoinColumn({ name: 'categoryId' })
    category: Category

    @OneToOne(() => Brand, (brand) => brand.id, { nullable: true })
    @JoinColumn({ name: 'brandId' })
    brand: Brand
}