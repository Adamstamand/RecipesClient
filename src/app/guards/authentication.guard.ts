import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { firstValueFrom } from 'rxjs';
import { RefreshToken } from '../models/refreshToken';

export const authenticationGuard: CanActivateFn = async () => {
  let isAuthenticated: boolean = false;
  const accountService = inject(AccountService);
  const router = inject(Router);
  try {
    const newToken: RefreshToken = await firstValueFrom(accountService.postNewToken());
    localStorage["token"] = newToken.token;
    localStorage["refreshToken"] = newToken.refreshToken;
    accountService.isLoggedIn = true;
    isAuthenticated = true;
  }
  catch (err) {
    console.error(err);
    router.navigate(['/']);
    isAuthenticated = false;
  }
  return isAuthenticated;
};