import { Component } from "@angular/core";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss"
})
export class HomeComponent {
    test() {
        /*this.sh.getProducts().subscribe((data: {}) => {
          console.log(data);
        });*/
        alert("Logged !!!");
    }
}
