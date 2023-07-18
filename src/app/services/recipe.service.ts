import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe';
import { RecipeWithId } from '../models/recipeWithId';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeUrl = 'https://localhost:7041/api/recipe';

  constructor(private httpClient: HttpClient) { }

  getAllRecipes() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<RecipeWithId[]>(this.recipeUrl, httpOptions);
  }

  getSpecificRecipe(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<RecipeWithId>(`${this.recipeUrl}/${id}`, httpOptions);
  };

  postRecipe(recipe: Recipe): Observable<RecipeWithId> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.post<RecipeWithId>(this.recipeUrl, recipe, httpOptions);
  }

  deleteRecipe(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.delete<number>(`${this.recipeUrl}/${id}`, httpOptions);
  }

  putRecipe(id: number, recipe: RecipeWithId) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.put<RecipeWithId>(`${this.recipeUrl}/${id}`, recipe, httpOptions);
  }
}