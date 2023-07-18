import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/registerUser';
import { LogIn } from '../models/login';
import { RefreshToken } from '../models/refreshToken';
import { AuthenticationResponse } from '../models/authenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseApiUrl: string = "https://localhost:7041/api";
  public isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) { }

  postRegister(registerUser: RegisterUser) {
    return this.httpClient.post<AuthenticationResponse>(`${this.baseApiUrl}/register`, registerUser);
  }

  postLogIn(logInUser: LogIn) {
    return this.httpClient.post<AuthenticationResponse>(`${this.baseApiUrl}/login`, logInUser);
  }

  getLogOut() {
    return this.httpClient.get(`${this.baseApiUrl}/logout`);
  }

  postNewToken() {
    let token = localStorage["token"];
    let refreshToken = localStorage["refreshToken"];
    let newToken: RefreshToken = {
      token: token,
      refreshToken: refreshToken
    };
    return this.httpClient.post<AuthenticationResponse>(`${this.baseApiUrl}/new-token`, newToken);
  }

  refreshTokenOnlyIfTokenCurrentlyExists() {
    if (localStorage["token"] != undefined && localStorage["refreshToken"] != undefined) {
      this.postNewToken().subscribe({
        next: (newToken: AuthenticationResponse) => {
          this.isLoggedIn = true;
          localStorage["token"] = newToken.token;
          localStorage["refreshToken"] = newToken.refreshToken;
        },
        error: err => {
          console.error(err);
          this.isLoggedIn = false;
        }
      });
    }
  }
}
