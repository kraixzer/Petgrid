import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-animal-characteristics",
    templateUrl: "./animal-characteristics.component.html",
    styleUrl: "./animal-characteristics.component.scss"
})
export class AnimalCharacteristicsComponent {
    constructor(
        public dialogRef: MatDialogRef<AnimalCharacteristicsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
    characteristics_value: string = "";
    characteristics_name: string = "";


    public ngOnInit(): void {
        console.log(this.data);
    }

    public onNoClick() {
        this.dialogRef.close();
    }

    public onSave() {

        console.log(this.characteristics_name);

        this.dialogRef.close({
            name: this.characteristics_name,
            value: this.characteristics_value
        });
    }
}
