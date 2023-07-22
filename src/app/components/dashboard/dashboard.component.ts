import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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

  deleteThis = new FormControl('', Validators.required);

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
        if (this.selectRecipe.value !== '') {
          let selectedRecipe = this.findRecipeFromSelectValue()!;
          this.recipeForm.patchValue({
            name: selectedRecipe.name,
            timeToPrepare: selectedRecipe.timeToPrepare,
            privacy: selectedRecipe.privacy,
            description: selectedRecipe.description,
            photo: selectedRecipe.photo
          });
          this.ingredients.length = 0;
          this.instructions.length = 0;
          for (let ingredient of selectedRecipe.ingredients) {
            this.ingredients.push(ingredient);
          }
          for (let instruction of selectedRecipe.instructions) {
            this.instructions.push(instruction);
          }
        } else { this.recipeForm.reset(); }
      }
    }
    );
  }

  deleteRecipe() {
    let id: number;
    if (this.deleteThis.value != null) {
      let deleteValue = this.dashboardRecipes?.filter(recipe => recipe.name.toLowerCase() == this.deleteThis.value?.toLowerCase());
      if (deleteValue) {
        id = deleteValue[0].id!;
        this.accountService.postNewToken().subscribe({
          next: newToken => {
            localStorage["token"] = newToken.token;
            localStorage["refreshToken"] = newToken.refreshToken;
            this.recipeService.deleteRecipe(id).subscribe({
              next: () => {
                let indexToSplice = this.dashboardRecipes!.findIndex(recipe => recipe.id == id);
                this.dashboardRecipes?.splice(indexToSplice, 1);
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
    }
  }

  submitRecipeEdit() {
    let recipeToEditId = this.findRecipeFromSelectValue()!.id!;
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

  private findRecipeFromSelectValue() {
    if (this.selectRecipe.value !== '' && this.dashboardRecipes !== undefined) {
      let selectedRecipe = this.dashboardRecipes
        .filter(recipe => recipe.name == this.selectRecipe.value);
      return selectedRecipe[0];
    }
    return null;
  }

  private findRecipeFromDeleteValue() {
    if (this.deleteThis.value !== '' && this.dashboardRecipes !== undefined) {
      let selectedRecipe = this.dashboardRecipes
        .filter(recipe => recipe.name == this.deleteThis.value);
      return selectedRecipe[0];
    }
    return null;
  }
}