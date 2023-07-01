import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent {
  recipeForm = this.formbuilder.group({
    name: ['', Validators.required],
    timeToPrepare: ['', Validators.required],
    ingredients: [''],
    description: ['', Validators.required],
    instructions: [''],
    photo: [''],
  });

  recipe?: Recipe;
  ingredients: string[] = [];
  instructions: string[] = [];

  constructor(private recipeService: RecipeService, private formbuilder: FormBuilder) { };



  addIngredient() {
    if (this.recipeForm.controls['ingredients'].value !== null
      && !this.ingredients.includes(this.recipeForm.controls['ingredients'].value)
    ) {
      this.ingredients.push(this.recipeForm.controls['ingredients'].value);
      this.recipeForm.controls['ingredients'].reset();
    }
    console.log(this.ingredients);
  }

  addInstruction() {
    if (this.recipeForm.controls['instructions'].value !== null
      && !this.instructions.includes(this.recipeForm.controls['instructions'].value)
    ) {
      this.instructions.push(this.recipeForm.controls['instructions'].value);
      this.recipeForm.controls['instructions'].reset();
    }
    console.log(this.ingredients);
  }

  postRecipe() {
    this.recipe = new Recipe(this.getRecipeValue('name'),
      this.getRecipeValue('timeToPrepare'),
      this.getRecipeValue('ingredients'),
      this.getRecipeValue('description'),
      this.getRecipeValue('instructions'),
      this.getRecipeValue('photo'),
    );
    console.log(this.recipe);
    this.recipeService.addRecipe(this.recipe).subscribe();
  }

  private getRecipeValue(control: string) {
    return this.recipeForm.get(control)!.value;
  }
}
