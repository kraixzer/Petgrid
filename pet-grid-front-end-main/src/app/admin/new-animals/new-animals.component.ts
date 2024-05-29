import { AnimalCharacteristicsComponent } from "./../dialogs/animal-characteristics/animal-characteristics.component";
import { Component } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { MatDialog } from "@angular/material/dialog";
import { Breed } from "../../interfaces/breed.interface";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { AdminService } from "../admin.service";

@Component({
    selector: "app-new-animals",
    templateUrl: "./new-animals.component.html",
    styleUrl: "./new-animals.component.scss"
})
export class NewAnimalsComponent {
    constructor(public dialog: MatDialog, private adminService: AdminService) {}

    animal_characteristics: Array<{ name: string; value: string }> = [];
    animal_specifics: Array<{ name: string; value: string }> = [];
    animal_name: string = "";
    animal_wiki_link: string = "";
    animal_description: string = "";
    animal_official_name: string = "";
    animal_other_names: string = "";
    animal_origin: string = "";

    all_breeds: Breed[] = [];

    selected_breed: any;

    // For uploading file

    uploaded_file!: any;
    selected_file_src!: any
    progress = 0;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.getBreeds();
    }

    public uploadLogo(event: any) {
        this.uploaded_file = event.target.files;
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.selected_file_src = reader.result;

            reader.readAsDataURL(file);
        }
    }

    public breedChanged(event: MatSelectChange) {
        console.log(event);
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
        const animalFormData = new FormData();
        animalFormData.append("animal_name", this.animal_name);
        animalFormData.append(
            "animal_characteristics",
            JSON.stringify(this.animal_characteristics)
        );
        animalFormData.append(
            "animal_specifics",
            JSON.stringify(this.animal_specifics)
        );
        animalFormData.append("animal_description", this.animal_description);
        animalFormData.append("animal_origin", this.animal_origin);
        animalFormData.append(
            "animal_official_name",
            this.animal_official_name
        );
        animalFormData.append("animal_wiki_link", this.animal_wiki_link);
        animalFormData.append("animal_other_names", this.animal_other_names);
        animalFormData.append("breed_id", this.selected_breed);
        animalFormData.append("animal_photo", this.uploaded_file[0]);

        this.adminService.createAnimal(animalFormData).subscribe(
            (event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log("Starting to Upload");
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log("Uploading your file now");
                        break;
                    case HttpEventType.UploadProgress:
                        this.progress = Math.round(
                            (event.loaded / this.uploaded_file[0].size) * 100
                        );
                        break;
                    case HttpEventType.Response:
                        console.log("File uploaded successfully!");
                }
            },
            (error) => {
                console.log(error.error.message);
            }
        );
    }

    private getBreeds() {
        this.adminService
            .getBreeds(0, 100, "ASC")
            .subscribe((response: any) => {
                this.all_breeds = [];
                this.all_breeds = response.data;
            });
    }
}
