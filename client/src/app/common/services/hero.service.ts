import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Hero from "../../../../../server/src/models/hero";

import { Observable, of } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HeroService {
  // Url that your server is running on
  private BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.BASE_URL + "/heroes", httpOptions);
  }

  getHeroesById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.BASE_URL}/heroes/${id}`);
  }
}
