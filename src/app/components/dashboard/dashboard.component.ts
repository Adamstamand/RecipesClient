import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';
import { Recipe } from 'src/app/models/recipe';
import { RecipeFormService } from 'src/app/services/recipe-form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardRecipes?: Recipe[];
  isLoggedIn: boolean = false;
  recipeForm: FormGroup = this.recipeFormService.recipeForm;
  ingredients: Ingredient[] = this.recipeFormService.ingredients;
  instructions: Instruction[] = this.recipeFormService.instructions;

  selectRecipe: FormControl = new FormControl('', Validators.required);

  deleteThis: FormControl = new FormControl('', Validators.required);

  constructor(private accountService: AccountService, private dashboardService: DashboardService,
    private router: Router, private recipeService: RecipeService, private recipeFormService: RecipeFormService) { }

  ngOnInit() {
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.accountService.isLoggedIn = true;
        this.accountService.accountName = newToken.userName;
        this.isLoggedIn = true;
        this.dashboardService.getDashboard().subscribe({
          next: (dashboardRecipes: Recipe[]) => {
            this.dashboardRecipes = dashboardRecipes;
          },
          error: err => {
            console.error(err);
            this.router.navigate(['/log-in']);
          }
        });
      },
      error: err => {
        console.error(err);
        this.router.navigate(['/log-in']);
      }
    });

    this.selectRecipe.valueChanges.subscribe({
      next: () => {
        this.recipeFormService.resetAllValues();
        if (this.selectRecipe.value !== '' && this.selectRecipe.value !== null) {
          let selectedRecipe = this.findRecipeFromSelectValue(this.selectRecipe.value)!;
          this.recipeForm.patchValue({
            name: selectedRecipe.name,
            timeToPrepare: selectedRecipe.timeToPrepare,
            privacy: selectedRecipe.privacy,
            description: selectedRecipe.description,
            photo: selectedRecipe.photo
          });
          let sortedIngredients = selectedRecipe.ingredients.sort((a, b) => a.position - b.position);
          for (let ingredient of sortedIngredients) {
            this.ingredients.push(ingredient);
          }
          let sortedInstructions = selectedRecipe.instructions.sort((a, b) => a.position - b.position);
          for (let instruction of sortedInstructions) {
            this.instructions.push(instruction);
          }
        }
      }
    }
    );
  }

  deleteRecipe() {
    let deleteValue = this.findRecipeFromSelectValue(this.deleteThis.value);
    let id = deleteValue!.id!;
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.recipeService.deleteRecipe(id).subscribe({
          next: () => {
            let indexToSplice = this.dashboardRecipes!.findIndex(recipe => recipe.id == id);
            if (deleteValue!.name === this.selectRecipe.value) {
              this.selectRecipe.reset();
            }
            this.dashboardRecipes?.splice(indexToSplice, 1);
            this.deleteThis.reset();
          },
          error: err => console.error(err)
        });
      },
      error: err => {
        console.error(err);
        this.router.navigate(['log-in']);
        this.accountService.isLoggedIn = false;
      }
    });
  }

  submitRecipeEdit() {
    let recipeToEditId = this.findRecipeFromSelectValue(this.selectRecipe.value)!.id!;
    let editRecipe: Recipe = {
      id: recipeToEditId,
      name: this.recipeForm.get('name')?.value.trim(),
      timeToPrepare: this.recipeForm.get('timeToPrepare')?.value,
      description: this.recipeForm.get('description')?.value.trim(),
      photo: this.recipeForm.get('photo')?.value.trim(),
      privacy: this.recipeForm.get('privacy')?.value.trim(),
      ingredients: this.ingredients,
      instructions: this.instructions
    };
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.recipeService.putRecipe(recipeToEditId, editRecipe).subscribe({
          next: () => this.router.navigate([`recipe/${recipeToEditId}`]),
          error: err => console.error(err)
        });
      },
      error: err => {
        console.error(err);
        this.router.navigate(['log-in']);
        this.accountService.isLoggedIn = false;
      }
    });
  }

  private findRecipeFromSelectValue(selectValue: string) {
    if (selectValue !== '' && this.dashboardRecipes !== undefined) {
      let selectedRecipe = this.dashboardRecipes
        .filter(recipe => recipe.name == selectValue);
      return selectedRecipe[0];
    }
    return null;
  }
}