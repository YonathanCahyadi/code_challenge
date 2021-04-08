import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import Hero from "../../../../../server/src/models/hero";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
    return this.http
      .get<Hero[]>(this.BASE_URL + "/heroes", httpOptions)
      .pipe(catchError(this.handleError));
  }

  getHeroesById(id: string): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.BASE_URL}/heroes/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
