import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { AnimalsEntity } from "./animals.entity";

@Entity({ name: "Breeds", synchronize: true })
export class BreedsEntity {
    @PrimaryGeneratedColumn()
    breed_id: number;

    @Column({ type: "varchar", length: 100 })
    breed_name: string;

    @Column({ type: "varchar", length: 255 })
    breed_wiki_link: string;

    @OneToMany(() => AnimalsEntity, (animal) => animal.breed_id)
    animal_id: AnimalsEntity[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
