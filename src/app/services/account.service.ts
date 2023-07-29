import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/registerUser';
import { LogIn } from '../models/login';
import { RefreshToken } from '../models/refreshToken';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseApiUrl: string = environment.apiUrl;
  public isLoggedIn: boolean = false;
  public accountName?: string;

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
          this.accountName = newToken.userName;
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
