import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DogsComponent } from "./dogs/dogs.component";
import { DogsService } from "./dogs/dogs.service";
import { CatsComponent } from "./cats/cats.component";
import { CatsService } from "./cats/cats.service";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { CardsComponent } from "./cards/cards.component";
import { HorsesComponent } from "./horses/horses.component";
import { HorsesService } from "./horses/horses.service";
import { MatCommonModule } from "@angular/material/core";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DogsComponent,
        CatsComponent,
        CardsComponent,
        HorsesComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatCommonModule,
        MatCardModule,
        MatGridListModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [],
    providers: [
        DogsService,
        CatsService,
        HorsesService,
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
