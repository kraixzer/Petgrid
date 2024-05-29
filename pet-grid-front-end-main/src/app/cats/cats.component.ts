import { Component } from "@angular/core";
import { CatsService } from "./cats.service";
import { merge } from "rxjs-compat/observable/merge";
import { of as observableOf } from "rxjs-compat/observable/of";
import { catchError } from "rxjs-compat/operators/catchError";
import { map } from "rxjs-compat/operators/map";
import { startWith } from "rxjs-compat/operators/startWith";
import { switchMap } from "rxjs-compat/operators/switchMap";

@Component({
    selector: "app-cats",
    templateUrl: "./cats.component.html",
    styleUrl: "./cats.component.scss"
})
export class CatsComponent {
    constructor(private service: CatsService) {}

    items: Array<any> = [];

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.getBreeds();
    }

    private getBreeds() {
        this.service
            .getAnimalsOfBreed(0, 10, 2, "DESC")
            .subscribe((response: any) => {
                response.data.forEach((element: any) => {
                    this.items.push(element);
                });
            });
    }
}
