import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
    providedIn: "root"
})
export class CatsService {
    test: any;
    subject: any;
    base_url = "http://localhost:3000/";
    private getBreedsURL = this.base_url + "animals/list-breeds";
    private getAnimalsOfBreedURL = this.base_url + "animals/list-animals";

    constructor(private http: HttpClient) {
        this.subject = new BehaviorSubject(this.test);
    }

    public sendMessage(message: any) {
        this.subject.next(message);
    }

    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    public getAnimalsOfBreed(
        start: number,
        limit: number,
        breed_id: number,
        direction: string
    ): Observable<any> {
        return this.http.get<any>(this.getAnimalsOfBreedURL, {
            params: {
                skip: start,
                take: limit,
                breed_id: breed_id,
                direction: direction
            }
        });
    }

    public getBreeds(
        start: number,
        limit: number,
        direction: string
    ): Observable<any> {
        return this.http.get<any>(this.getBreedsURL, {
            params: {
                skip: start,
                take: limit,
                direction: direction
            }
        });
    }
}
