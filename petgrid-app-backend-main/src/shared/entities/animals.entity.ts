import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { AnimalCharacteristics } from "../object-classes/animal_characteristics";
import { AnimalSpecifics } from "../object-classes/animal_specifics";
import { BreedsEntity } from "./breeds.entity";
import { ProductsEntity } from "./products.entity";
@Entity({ name: "Animals", synchronize: true })
export class AnimalsEntity {
    @PrimaryGeneratedColumn()
    animal_id: number;

    @Column({ type: "varchar", length: 100 })
    animal_name: string;

    @Column({ type: "varchar", length: 255 })
    animal_wiki_link: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    animal_photo: string;

    @Column({ type: "longtext", nullable: true }) // does not have a default value
    animal_description: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    animal_official_name: string;

    @Column({ type: "text" })
    animal_other_names: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    animal_origin: string;

    @Column({ type: "json", nullable: true })
    animal_characteristics: AnimalCharacteristics[];

    @Column({ type: "json", nullable: true })
    animal_specifics: AnimalSpecifics[];

    @ManyToOne(() => BreedsEntity, (breed) => breed.breed_id)
    @JoinColumn({ name: "breed_id" })
    breed_id: number;

    @OneToMany(() => ProductsEntity, (product) => product.animal_id)
    product_id: ProductsEntity[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
