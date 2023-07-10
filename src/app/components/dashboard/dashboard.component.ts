import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { RefreshToken } from 'src/app/models/refreshToken';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private accountService: AccountService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.dashboardService.getDashboard().subscribe({
          next: value => console.log(value),
          error: err => console.error(err)
        });
      },
      error: err => console.error(err)
    });
  }
}
