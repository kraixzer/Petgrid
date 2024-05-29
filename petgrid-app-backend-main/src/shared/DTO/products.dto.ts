import { PRODUCT_CATEGORY } from "../enums/product_category.enum";
import { OnlineStores } from "../object-classes/online_stores";

export class ProductsDTO {
    animal_id: number;
    breed_id: number;
    product_name: string;
    product_category: PRODUCT_CATEGORY;
    online_stores: OnlineStores[];
    product_photo: string;
}
