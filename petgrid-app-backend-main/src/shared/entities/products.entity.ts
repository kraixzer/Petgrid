import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { OnlineStores } from "../object-classes/online_stores";
import { AnimalsEntity } from "./animals.entity";
import { PRODUCT_CATEGORY } from "../enums/product_category.enum";

@Entity({ name: "Products", synchronize: true })
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({ type: "varchar", length: 100 })
    product_name: string;

    @Column({
        type: "enum",
        nullable: false,
        enum: PRODUCT_CATEGORY,
        default: PRODUCT_CATEGORY.OTHERS
    })
    product_category: PRODUCT_CATEGORY;

    @Column({ type: "varchar", length: 255, nullable: true })
    product_photo: string;

    @Column({ type: "json", nullable: true })
    online_stores: OnlineStores[];

    @ManyToOne(() => AnimalsEntity, (animal) => animal.animal_id)
    @JoinColumn({ name: "animal_id" })
    animal_id: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
