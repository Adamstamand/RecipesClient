import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Instruction } from '../../models/instruction';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent {
  recipeForm: FormGroup = this.formbuilder.group({
    name: ['', Validators.required],
    timeToPrepare: ['', Validators.required],
    ingredients: [''],
    description: ['', Validators.required],
    instructions: [''],
    photo: ['', [Validators.required, Validators.pattern("^https:\/\/images\.unsplash\.com\/.*")]],
  });

  recipe?: Recipe;
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];

  constructor(private recipeService: RecipeService, private formbuilder: FormBuilder) { };

  addIngredient() {
    if (this.recipeForm.controls['ingredients'].value !== null
      // && !this.ingredients.includes(this.recipeForm.controls['ingredients'].value)
    ) {
      let newIngredient = new Ingredient(this.recipeForm.controls['ingredients'].value);
      this.ingredients.push(newIngredient);
      this.recipeForm.controls['ingredients'].reset();
    }
    console.log(this.ingredients);
  }

  addInstruction() {
    if (this.recipeForm.controls['instructions'].value !== null
      //&& !this.instructions.includes(this.recipeForm.controls['instructions'].value)
    ) {
      let newInstruction = new Instruction(this.recipeForm.controls['instructions'].value, this.instructions.length);
      this.instructions.push(newInstruction);
      this.recipeForm.controls['instructions'].reset();
    }
    console.log(this.instructions);
  }

  submitRecipe() {
    this.recipe = new Recipe(this.getRecipeValue('name'),
      this.getRecipeValue('timeToPrepare'),
      this.ingredients,
      this.getRecipeValue('description'),
      this.instructions,
      this.getRecipeValue('photo'),
    );
    console.log(this.recipe);
    this.recipeService.postRecipe(this.recipe).subscribe();
  }

  private getRecipeValue(control: string) {
    return this.recipeForm.get(control)!.value;
  }
}
