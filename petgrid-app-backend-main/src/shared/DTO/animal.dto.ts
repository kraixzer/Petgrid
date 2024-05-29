import { AnimalSpecifics } from "../object-classes/animal_specifics";
import { AnimalCharacteristics } from "../object-classes/animal_characteristics";

export class AnimalDTO {
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
