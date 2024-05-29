import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { AdminService } from "../admin.service";
import { MatTableDataSource } from "@angular/material/table";
import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import {MatSort, SortDirection} from '@angular/material/sort';

@Component({
    selector: "app-breeds",
    templateUrl: "./breeds.component.html",
    styleUrl: "./breeds.component.scss"
})
export class BreedsComponent {
    constructor(
        private service: AdminService,
        private changeRef: ChangeDetectorRef
    ) {}

    breed_name: string = "";
    breed_wiki_link: string = "";

    has_clicked_submit = false;
    breedResultsLength = 0;
    isLoading = false;

    list_of_breeds = new MatTableDataSource();
    breed_table_columns = ["breed_id", "breed_name", "breed_wiki_link"];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.getBreeds();
    }

    public onWikiClick(element: any){
        window.open(element.breed_wiki_link, "_blank");
    }

    public submit() {
        if (this.has_clicked_submit) {
            console.log("Retrying");
        } else {
            try {
                this.service
                    .createBreed(this.breed_name, this.breed_wiki_link)
                    .subscribe(
                        (response: any) => {
                            console.log(response);
                            this.getBreeds();
                        },
                        (error: any) => {
                            this.has_clicked_submit = true;
                            console.log(error);
                        },
                        () => {
                            console.log("breed created");
                            this.has_clicked_submit = true;
                        }
                    );
            } catch (error) {
                console.log(error);
                this.has_clicked_submit = true;
            }
        }
    }

    private getBreeds(){

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({ data: [], recordsTotal: 0 }),
                switchMap(() => {
                    this.isLoading = true;
                    return this.service.getBreeds(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize, this.sort.direction);
                }),
                map((result) => {
                    this.isLoading = false;
                    this.breedResultsLength = result.total;
                    return result.data;
                }),
                catchError(() => {
                    this.isLoading = false;
                    return observableOf([]);
                })
            )
            .subscribe(async (data) => {
                this.list_of_breeds.data = data;
                this.isLoading = false;
            }, (error: any) => {
                console.log(error);
            }, () => {
                console.log(this.list_of_breeds);
                this.changeRef.detectChanges();
            });
    }
}
