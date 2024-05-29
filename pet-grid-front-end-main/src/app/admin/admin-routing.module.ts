import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NewAnimalsComponent } from "./new-animals/new-animals.component";
import { EditAnimalsComponent } from "./edit-animals/edit-animals.component";
import { BreedsComponent } from "./breeds/breeds.component";

const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
        children: [
            {
                path: "",
                redirectTo: "admin",
                pathMatch: "full"
            },
            {
                path: "admin",
                component: AdminComponent
            },
            {
                path: "new",
                component: NewAnimalsComponent
            },
            {
                path: "edit",
                component: EditAnimalsComponent
            },
            {
                path: "breeds",
                component: BreedsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
