import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeUrl = `${environment.apiUrl}/recipe`;

  constructor(private httpClient: HttpClient) { }

  getAllRecipes() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<Recipe[]>(this.recipeUrl, httpOptions);
  }

  getSpecificRecipe(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<Recipe>(`${this.recipeUrl}/${id}`, httpOptions);
  };

  postRecipe(recipe: Recipe) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.post<Recipe>(this.recipeUrl, recipe, httpOptions);
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

  putRecipe(id: number, recipe: Recipe) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.put<Recipe>(`${this.recipeUrl}/${id}`, recipe, httpOptions);
  }
}