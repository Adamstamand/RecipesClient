import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';
import { RecipeWithId } from 'src/app/models/recipeWithId';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes?: RecipeWithId[];
  constructor(private recipeService: RecipeService, private accountService: AccountService) { }

  ngOnInit() {
    this.getRecipes();

    this.accountService.refreshTokenOnlyIfTokenCurrentlyExists();
  }

  getRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => console.log(err)
    });
  }
}
