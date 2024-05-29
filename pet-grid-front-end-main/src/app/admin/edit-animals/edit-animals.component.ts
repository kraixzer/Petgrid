import { AnimalCharacteristicsComponent } from "./../dialogs/animal-characteristics/animal-characteristics.component";
import { Component } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { MatDialog } from "@angular/material/dialog";
import { AdminService } from "../admin.service";

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: "app-edit-animals",
    templateUrl: "./edit-animals.component.html",
    styleUrl: "./edit-animals.component.scss"
})
export class EditAnimalsComponent {
    constructor(
        public dialog: MatDialog,
        private adminService: AdminService
    ) {}

    animal_characteristics: Array<{ name: string; value: string }> = [];
    animal_specifics: Array<{ name: string; value: string }> = [];
    animal_name: string = "";

    foods: Food[] = [
        { value: "steak-0", viewValue: "Steak" },
        { value: "pizza-1", viewValue: "Pizza" },
        { value: "tacos-2", viewValue: "Tacos" }
    ];

    selected_breed: string = "";

    public breedChanged(event: MatSelectChange) {
        console.log(event.source);
        console.log(event.value);
    }

    public openDialogForCharacteristics(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        const dialogRef = this.dialog.open(AnimalCharacteristicsComponent, {
            width: "60%",
            height: "60%",
            enterAnimationDuration,
            exitAnimationDuration,
            data: { title: "Animal Characteristics" }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            this.animal_characteristics.push(response);
        });
    }

    public openDialogForSpecifics(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        const dialogRef = this.dialog.open(AnimalCharacteristicsComponent, {
            width: "60%",
            height: "60%",
            enterAnimationDuration,
            exitAnimationDuration,
            data: { title: "Animal Specifics" }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            this.animal_specifics.push(response);
        });
    }

    public submit() {
    }
}
