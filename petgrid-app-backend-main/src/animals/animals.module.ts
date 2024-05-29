import { Module } from "@nestjs/common";
import { AnimalsController } from "./animals.controller";
import { AnimalsService } from "./services/animals.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedsEntity } from "src/shared/entities/breeds.entity";
import { AnimalsEntity } from "src/shared/entities/animals.entity";
import { ProductsEntity } from "src/shared/entities/products.entity";
import { FileUploadService } from "./services/file-upload.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([BreedsEntity, AnimalsEntity, ProductsEntity])
    ],
    controllers: [AnimalsController],
    providers: [AnimalsService, FileUploadService]
})
export class AnimalsModule {}
