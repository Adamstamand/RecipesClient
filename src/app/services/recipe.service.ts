import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Recipe, RecipeFromDB } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeUrl = 'https://localhost:7041/api/recipe';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage['token']}`
    })
  };

  constructor(private httpClient: HttpClient) { }

  getRecipe() {
    return this.httpClient.get<RecipeFromDB[]>(this.recipeUrl, this.httpOptions);
  }

  getSpecificRecipe(id: number) {
    return this.httpClient.get<RecipeFromDB>(`${this.recipeUrl}/${id}`, this.httpOptions);
  }

  postRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.recipeUrl, recipe, this.httpOptions);
  }
}