import { Component, OnInit, inject } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';
import { RecipeFromDb } from 'src/app/models/recipeFromDb';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes?: RecipeFromDb[];
  constructor(private recipeService: RecipeService) { }

  whatsTheRecipe() {
    console.log(this.recipes);
    console.log(localStorage['token']);
  }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.recipeService.getRecipe().subscribe({
      next: recipes => this.recipes = recipes,
      error: error => console.log(error)
    });

  }
}
