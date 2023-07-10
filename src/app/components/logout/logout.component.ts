import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private accountService: AccountService, private router: Router) { }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.accountService.getLogOut().subscribe({
      error: err => console.error(err)
    });
    this.accountService.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
