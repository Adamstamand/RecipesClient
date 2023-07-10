import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RecipeFromDb } from '../models/recipeFromDb';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardApi = "https://localhost:7041/api/dashboard";

  constructor(private httpClient: HttpClient) { }

  getDashboard() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get(this.dashboardApi, httpOptions);
  }
}