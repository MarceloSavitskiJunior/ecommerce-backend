import { Brand } from "src/cases/brands/brand.entity";
import { Category } from "src/cases/categories/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductPhoto } from "./product-photo.entity";

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

    @ManyToOne(() => Brand, (brand) => brand.id, { nullable: true })
    @JoinColumn({ name: 'brandId' })
    brand: Brand

    @OneToMany(() => ProductPhoto, (photo) => photo.product, { eager: true, cascade: true })
    photos?: ProductPhoto[];
}