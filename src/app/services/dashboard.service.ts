import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardApi = `${environment.apiUrl}/dashboard`;

  constructor(private httpClient: HttpClient) { }

  getDashboard() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage['token']}`
      })
    };
    return this.httpClient.get<Recipe[]>(this.dashboardApi, httpOptions);
  }
}