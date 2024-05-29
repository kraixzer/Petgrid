import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BreedDTO } from "src/shared/DTO/breed.dto";
import { AnimalDTO } from "src/shared/DTO/animal.dto";
import { ProductsDTO } from "src/shared/DTO/products.dto";
import { AnimalsEntity } from "src/shared/entities/animals.entity";
import { BreedsEntity } from "src/shared/entities/breeds.entity";
import { ProductsEntity } from "src/shared/entities/products.entity";
import { Repository } from "typeorm";
import { FileUploadService } from "./file-upload.service";
import { ORDER } from "src/shared/enums/order.enum";

@Injectable()
export class AnimalsService {
    constructor(
        @InjectRepository(BreedsEntity)
        private readonly breedsRepository: Repository<BreedsEntity>,

        @InjectRepository(AnimalsEntity)
        private readonly animalsRepository: Repository<AnimalsEntity>,
        private fileService: FileUploadService,

        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>
    ) {}

    public async createBreed(data: BreedDTO) {
        const inserted_data = await this.breedsRepository.insert(data);

        const saved_data = await this.breedsRepository.findOne({
            where: { breed_id: inserted_data.identifiers[0].breed_id }
        });

        return saved_data;
    }

    public async createAnimal(data: AnimalDTO, file: Express.Multer.File) {
        try {
            const inserted_data = await this.animalsRepository.insert(data);

            const breed = await this.breedsRepository.findOne({
                where: { breed_id: data.breed_id }
            });

            const animal_photo =
                breed.breed_name.toLowerCase() +
                "/" +
                data.animal_name.toLowerCase().replace(/ /g, "_") +
                "." +
                file.originalname.split(".")[1];

            try {
                await this.fileService.upload(file, animal_photo);
            } catch (error) {
                console.log(error);
            }

            await this.animalsRepository.update(
                {
                    animal_id: inserted_data.identifiers[0].animal_id
                },
                {
                    animal_photo: "public-images/" + animal_photo
                }
            );

            const saved_data = await this.animalsRepository.findOne({
                relations: ["breed_id"],
                where: { animal_id: inserted_data.identifiers[0].animal_id }
            });

            saved_data.animal_photo =
                process.env.AWS_S3_OBJECT_BASE_URL + saved_data.animal_photo;

            return saved_data;
        } catch (error) {
            console.log(error);
        }
    }

    public async createProduct(data: ProductsDTO, file: Express.Multer.File) {
        const inserted_data = await this.productsRepository.insert(data);

        const breed = await this.breedsRepository.findOne({
            where: { breed_id: data.breed_id }
        });

        const product_photo =
            breed.breed_name.toLowerCase() +
            "/" +
            "products/" +
            data.product_category.toLowerCase() +
            "/" +
            data.product_name.toLowerCase().replace(" ", "_") +
            "." +
            file.originalname.split(".")[1];

        try {
            await this.fileService.upload(file, product_photo);
        } catch (error) {
            console.log(error);
        }

        await this.productsRepository.update(
            {
                product_id: inserted_data.identifiers[0].product_id
            },
            {
                product_photo: "public-images/" + product_photo
            }
        );

        const saved_data = await this.productsRepository.findOne({
            relations: ["animal_id"],
            where: { product_id: inserted_data.identifiers[0].product_id }
        });

        saved_data.product_photo =
            process.env.AWS_S3_OBJECT_BASE_URL + saved_data.product_photo;

        return saved_data;
    }

    public async getBreeds(
        skip: number,
        take: number,
        order: ORDER
    ): Promise<[BreedsEntity[], number]> {
        const breeds = await this.breedsRepository.findAndCount({
            select: ["breed_id", "breed_name", "breed_wiki_link"],
            skip: skip,
            take: take,
            order: {
                breed_id: order
            }
        });
        return breeds;
    }

    public async getAnimals(
        skip: number,
        take: number,
        breed_id: number,
        order: ORDER
    ): Promise<[AnimalsEntity[], number]> {
        const animals = await this.animalsRepository.findAndCount({
            relations: ["breed_id", "product_id"],
            skip: skip,
            take: take,
            order: {
                created_at: order
            },
            where: { breed_id: breed_id }
        });
        return animals;
    }

    public async getProducts(
        skip: number,
        take: number,
        order: ORDER,
        animal_id: any | null
    ): Promise<[ProductsEntity[], number]> {
        const products = await this.productsRepository.findAndCount({
            relations: ["animal_id"],
            where: { animal_id: animal_id },
            skip: skip,
            take: take,
            order: {
                created_at: order
            }
        });
        return products;
    }
}
