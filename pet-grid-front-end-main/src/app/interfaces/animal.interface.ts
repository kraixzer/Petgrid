import { AnimalCharacteristics } from "./animal-characteristics.interface";
import { AnimalSpecifics } from "./animal-specifics.interface";

export interface Animal {
    animal_name: string;
    animal_wiki_link: string;
    animal_description: string;
    animal_official_name: string;
    animal_other_names: string;
    animal_origin: string;
    breed_id: number;
    animal_characteristics: AnimalCharacteristics[];
    animal_specifics: AnimalSpecifics[];
}
