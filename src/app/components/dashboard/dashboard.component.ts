import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RecipeFromDb } from 'src/app/models/recipeFromDb';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardRecipes?: RecipeFromDb[];
  deleteThis = new FormControl('');
  isLoggedIn: boolean = false;

  constructor(private accountService: AccountService, private dashboardService: DashboardService,
    private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.accountService.isLoggedIn = true;
        this.isLoggedIn = true;
        this.dashboardService.getDashboard().subscribe({
          next: (dashboardRecipes: RecipeFromDb[]) => {
            this.dashboardRecipes = dashboardRecipes;
          },
          error: err => {
            console.error(err);
            this.router.navigate(['/log-in']);
          }
        });
      },
      error: err => {
        console.error(err);
        this.router.navigate(['/log-in']);
      }
    });
  }

  deleteRecipe() {
    let id: number;
    if (this.deleteThis.value != null) {
      console.log("deleting");
      id = parseInt(this.deleteThis.value);
      this.recipeService.deleteRecipe(id).subscribe();
    }
  }
}
