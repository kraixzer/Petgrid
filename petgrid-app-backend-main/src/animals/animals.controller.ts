import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpException,
    HttpStatus,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { AnimalsService } from "./services/animals.service";
import { Request } from "express";
import { BreedDTO } from "src/shared/DTO/breed.dto";
import { AnimalDTO } from "src/shared/DTO/animal.dto";
import { ProductsDTO } from "src/shared/DTO/products.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ORDER } from "src/shared/enums/order.enum";

@Controller("animals")
export class AnimalsController {
    constructor(private animalService: AnimalsService) {}

    @Get("list-breeds")
    public async getBreedsList(
        @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query("take", new DefaultValuePipe(10), ParseIntPipe) take: number,
        @Query("order", new DefaultValuePipe("desc"))
        order: ORDER
    ) {
        try {
            const [breeds, count] = await this.animalService.getBreeds(
                skip,
                take,
                order
            );
            return {
                status: HttpStatus.CREATED,
                message: "Breeds fetched",
                total: count,
                data: breeds
            };
        } catch (error) {
            throw new HttpException(
                "Could not fetch data",
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error.message
                }
            );
        }
    }

    @Get("list-animals")
    public async getAnimalsList(
        @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query("take", new DefaultValuePipe(10), ParseIntPipe) take: number,
        @Query("breed_id", ParseIntPipe) breed_id: number,
        @Query("order", new DefaultValuePipe("ASC"))
        order: ORDER
    ) {
        try {
            const [animals, count] = await this.animalService.getAnimals(
                skip,
                take,
                breed_id,
                order
            );
            return {
                status: HttpStatus.CREATED,
                message: "Animals successfully fetched",
                total: count,
                data: animals
            };
        } catch (error) {
            throw new HttpException(
                "Could not fetch data",
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error.message
                }
            );
        }
    }

    @Get("list-products")
    public async getProductsList(
        @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query("take", new DefaultValuePipe(10), ParseIntPipe) take: number,
        @Query("order", new DefaultValuePipe("ASC"))
        order: ORDER,
        @Query("animal_id") animal_id: number
    ) {
        try {
            const [products, count] = await this.animalService.getProducts(
                skip,
                take,
                order,
                animal_id
            );
            return {
                status: HttpStatus.CREATED,
                message: "Products successfully fetched",
                total: count,
                data: products
            };
        } catch (error) {
            throw new HttpException(
                "Could not fetch data",
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error.message
                }
            );
        }
    }

    @Post("breed")
    public async addBreed(@Req() request: Request, @Body() data: BreedDTO) {
        try {
            const inserted_data = await this.animalService.createBreed(data);

            return {
                status: HttpStatus.CREATED,
                message: "Breed Successfully created",
                data: inserted_data
            };
        } catch (error) {
            throw new HttpException(
                "Could not insert data",
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error.message
                }
            );
        }
    }

    @UseInterceptors(FileInterceptor("animal_photo"))
    @Post("animal")
    public async addAnimal(
        @UploadedFile() file: Express.Multer.File,
        @Req() request: Request,
        @Body() data: AnimalDTO
    ) {
        try {
            const inserted_data = await this.animalService.createAnimal(
                data,
                file
            );

            return {
                status: HttpStatus.CREATED,
                message: "Animal Successfully created",
                data: inserted_data
            };
        } catch (error) {
            throw new HttpException(
                "Could not insert data",
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error.message
                }
            );
        }
    }

    @UseInterceptors(FileInterceptor("product_photo"))
    @Post("product")
    public async addProduct(
        @UploadedFile() file: Express.Multer.File,
        @Req() request: Request,
        @Body() data: ProductsDTO
    ) {
        try {
            const inserted_data = await this.animalService.createProduct(
                data,
                file
            );

            return {
                status: HttpStatus.CREATED,
                message: "Product Successfully created",
                data: inserted_data
            };
        } catch (error) {
            throw new HttpException(
                "Could not insert data",
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error.message
                }
            );
        }
    }
}
