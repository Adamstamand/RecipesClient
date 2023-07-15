import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';
import { RecipeFromDb } from 'src/app/models/recipeFromDb';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes?: RecipeFromDb[];
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
