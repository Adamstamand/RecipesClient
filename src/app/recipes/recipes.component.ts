import { Component, OnInit, inject } from '@angular/core';

import { RecipeService } from '../services/recipe.service';
import { Recipe, RecipeFromDB } from '../models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes?: RecipeFromDB[];
  constructor(private recipeService: RecipeService) { }

  whatsTheRecipe() {
    console.log(this.recipes);
  }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.recipeService.getRecipe().subscribe(recipes => this.recipes = recipes);
  }
}
