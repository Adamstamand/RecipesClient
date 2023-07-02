import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Recipe, RecipeFromDB } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeUrl = 'https://localhost:7041/api/recipe';

  constructor(private http: HttpClient) { }

  getRecipe() {
    return this.http.get<RecipeFromDB[]>(this.recipeUrl);
  }

  getSpecificRecipe(id: number) {
    return this.http.get<RecipeFromDB>(`${this.recipeUrl}/${id}`);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipeUrl, recipe, this.httpOptions);
  }
}