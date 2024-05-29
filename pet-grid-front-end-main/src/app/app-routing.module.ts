import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CatsComponent } from "./cats/cats.component";
import { DogsComponent } from "./dogs/dogs.component";
import { HorsesComponent } from "./horses/horses.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "cats",
        component: CatsComponent
    },
    {
        path: "dogs",
        component: DogsComponent
    },
    {
        path: "horses",
        component: HorsesComponent
    },
    {
        path: "admin",
        loadChildren: () =>
            import("./admin/admin.module").then((m) => m.AdminModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
