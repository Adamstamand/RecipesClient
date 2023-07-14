import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Instruction } from '../../models/instruction';
import { Ingredient } from '../../models/ingredient';
import { AccountService } from 'src/app/services/account.service';
import { AddRecipe } from 'src/app/models/addRecipe';
import { RefreshToken } from 'src/app/models/refreshToken';
import { Router } from '@angular/router';
import { RecipeFromDb } from 'src/app/models/recipeFromDb';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent {
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];

  recipeForm: FormGroup = this.formbuilder.group({
    name: ['', Validators.required],
    timeToPrepare: ['', Validators.required],
    ingredients: [''],
    privacy: ['public', Validators.required],
    description: ['', Validators.required],
    instructions: [''],
    photo: ['', [Validators.required, Validators.pattern("^https:\/\/images\.unsplash\.com\/.*")]],
  });

  constructor(private recipeService: RecipeService, private formbuilder: FormBuilder,
    private accountService: AccountService, private route: Router) { };

  addIngredient() {
    if (this.recipeForm.controls['ingredients'].value !== null
      && !this.ingredients.some(value => value.words == this.recipeForm.controls['ingredients'].value)
    ) {
      let newIngredient = new Ingredient(this.recipeForm.controls['ingredients'].value);
      this.ingredients.push(newIngredient);
      this.recipeForm.controls['ingredients'].reset();
    }
    console.log(this.ingredients);
  }

  addInstruction() {
    if (this.recipeForm.controls['instructions'].value !== null
      && !this.instructions.some(value => value.words == this.recipeForm.controls['instructions'].value)
    ) {
      let newInstruction = new Instruction(this.recipeForm.controls['instructions'].value, this.instructions.length);
      this.instructions.push(newInstruction);
      this.recipeForm.controls['instructions'].reset();
    }
    console.log(this.instructions);
  }

  removeValue<T>(valueArray: T[], value: T) {
    const index = valueArray.indexOf(value);
    valueArray.splice(index, 1);

  }

  submitRecipe() {
    let recipeRequest: Recipe = {
      name: this.getRecipeValue('name'),
      timeToPrepare: this.getRecipeValue('timeToPrepare'),
      ingredients: this.ingredients,
      description: this.getRecipeValue('description'),
      instructions: this.instructions,
      photo: this.getRecipeValue('photo'),
      privacy: this.getRecipeValue('privacy')
    };

    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage['token'] = newToken.token;
        localStorage['refreshToken'] = newToken.refreshToken;

        this.recipeService.postRecipe(recipeRequest).subscribe({
          next: (value: RecipeFromDb) => {
            console.log(value);
            this.route.navigate([`/recipe/${value.recipeId}`]);
          }
        });
      },
      error: err => console.error('Error submitting recipe:', err)
    });
  }

  private getRecipeValue(control: string) {
    return this.recipeForm.get(control)!.value;
  }
}
