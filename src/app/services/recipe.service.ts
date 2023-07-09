import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AddRecipe } from '../models/addRecipe';
import { RecipeFromDb } from '../models/recipeFromDb';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeUrl = 'https://localhost:7041/api/recipe';

  constructor(private httpClient: HttpClient) { }

  getRecipe() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<RecipeFromDb[]>(this.recipeUrl, httpOptions);
  }

  getSpecificRecipe(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<RecipeFromDb>(`${this.recipeUrl}/${id}`, httpOptions);
  };

  postRecipe(recipe: AddRecipe): Observable<RecipeFromDb> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.post<RecipeFromDb>(this.recipeUrl, recipe, httpOptions);
  }
}