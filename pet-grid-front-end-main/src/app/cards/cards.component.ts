import { Component, Input } from "@angular/core";

@Component({
    selector: "app-cards",
    templateUrl: "./cards.component.html",
    styleUrl: "./cards.component.scss"
})
export class CardsComponent {
    @Input() animals: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        console.log(this.animals);
    }

    public goToLink(link: string) {
        window.open(link, "_blank");
    }
}
