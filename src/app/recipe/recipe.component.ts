import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeFromDB } from '../models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipe!: RecipeFromDB;

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ resolvedRecipe }) => this.recipe = resolvedRecipe);
  }

  whatsTheRecipe() {
    console.log(this.recipe);
  }
}

