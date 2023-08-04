import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AccountService } from 'src/app/services/account.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes?: Recipe[];
  isLoading: boolean = true;
  loadingArray = new Array(10);

  constructor(private recipeService: RecipeService, private accountService: AccountService) { }

  ngOnInit() {
    this.getRecipes();
    this.accountService.refreshTokenOnlyIfTokenCurrentlyExists();
  }

  getRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: recipes => {
        this.isLoading = false;
        this.recipes = recipes;
      },
      error: err => console.log(err)
    });
  }
}
