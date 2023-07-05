import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { Observable } from 'rxjs';
import { LogIn } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseApiUrl: string = "https://localhost:7041/api";

  constructor(private httpClient: HttpClient) { }

  postRegister(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post<RegisterUser>(`${this.baseApiUrl}/register`, registerUser);
  }

  postLogIn(logInUser: LogIn): Observable<any> {
    return this.httpClient.post<LogIn>(`${this.baseApiUrl}/login`, logInUser);
  }

  getLogOut() {
    return this.httpClient.get(`${this.baseApiUrl}/logout`);
  }
}
