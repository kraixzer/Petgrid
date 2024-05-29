import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { NewAnimalsComponent } from "./new-animals/new-animals.component";
import { EditAnimalsComponent } from "./edit-animals/edit-animals.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCommonModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { AnimalCharacteristicsComponent } from "./dialogs/animal-characteristics/animal-characteristics.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AdminService } from "./admin.service";
import { BreedsComponent } from "./breeds/breeds.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
    declarations: [
        AdminComponent,
        NewAnimalsComponent,
        EditAnimalsComponent,
        AnimalCharacteristicsComponent,
        BreedsComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        MatCommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [AdminService]
})
export class AdminModule {}
