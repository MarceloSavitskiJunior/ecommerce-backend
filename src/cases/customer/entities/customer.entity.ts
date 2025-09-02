import { City } from "src/cases/cities/entities/city.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ length: 250, nullable: true })
    address: string

    @Column({ length: 8, nullable: true})
    zipCode: string

    @ManyToOne(() => City, (city) => city.id, { eager: true, nullable: false })
    @JoinColumn({ name: 'cityId' })
    city: City
}