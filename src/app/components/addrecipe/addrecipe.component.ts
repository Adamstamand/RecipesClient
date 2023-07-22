import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Instruction } from '../../models/instruction';
import { Ingredient } from '../../models/ingredient';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/authenticationResponse';
import { RecipeFormService } from 'src/app/services/recipe-form.service';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {
  recipeForm: FormGroup = this.recipeFormService.recipeForm;
  instructions: Instruction[] = this.recipeFormService.instructions;
  ingredients: Ingredient[] = this.recipeFormService.ingredients;
  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private recipeFormService: RecipeFormService,
    private accountService: AccountService, private router: Router) { };

  ngOnInit(): void {
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.accountService.isLoggedIn = true;
        this.isLoggedIn = true;
        this.accountService.accountName = newToken.userName;
      },
      error: err => {
        console.error(err);
        this.router.navigate(['/log-in']);
      }
    });
  }

  submitRecipe() {
    let recipeRequest: Recipe = {
      name: this.recipeForm.get('name')?.value.trim(),
      timeToPrepare: this.recipeForm.get('timeToPrepare')?.value,
      description: this.recipeForm.get('description')?.value.trim(),
      photo: this.recipeForm.get('photo')?.value.trim(),
      privacy: this.recipeForm.get('privacy')?.value,
      ingredients: this.ingredients,
      instructions: this.instructions
    };

    this.accountService.postNewToken().subscribe({
      next: (response: AuthenticationResponse) => {
        localStorage['token'] = response.token;
        localStorage['refreshToken'] = response.refreshToken;

        this.recipeService.postRecipe(recipeRequest).subscribe({
          next: (recipe: Recipe) => {
            this.router.navigate([`/recipe/${recipe.id}`]);
          },
          error: err => console.error(err)
        });
      },
      error: err => console.error('Error submitting recipe:', err)
    });
  }
}
