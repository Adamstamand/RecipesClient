import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RecipeFromDb } from 'src/app/models/recipeFromDb';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DeleteValidator } from 'src/app/validators/deleteValidator';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardRecipes?: RecipeFromDb[];
  isLoggedIn: boolean = false;
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];

  deleteThis = new FormControl('', [DeleteValidator(() => this.dashboardRecipes)]);

  recipeForm: FormGroup = this.formbuilder.group({
    name: ['', Validators.required],
    timeToPrepare: ['', Validators.required],
    ingredients: [''],
    privacy: ['public', Validators.required],
    description: ['', Validators.required],
    instructions: [''],
    photo: ['', [Validators.required, Validators.pattern("^https:\/\/images\.unsplash\.com\/.*")]],
  });

  constructor(private accountService: AccountService, private dashboardService: DashboardService,
    private router: Router, private recipeService: RecipeService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.accountService.isLoggedIn = true;
        this.isLoggedIn = true;
        this.dashboardService.getDashboard().subscribe({
          next: (dashboardRecipes: RecipeFromDb[]) => {
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

    this.recipeForm.get('name')!.valueChanges.subscribe({
      next: () => {
        for (let recipe of this.findRecipeFromSelectValue()!) {
          this.recipeForm.patchValue({
            timeToPrepare: recipe.timeToPrepare,
            privacy: recipe.privacy,
            description: recipe.description,
            photo: recipe.photo
          });
          this.ingredients = [];
          this.instructions = [];
          for (let ingredient of recipe.ingredients) {
            this.ingredients.push(ingredient);
          }
          for (let instruction of recipe.instructions) {
            this.instructions.push(instruction);
          }
        }
      }
    });
  }

  logDashboardRecipes() {
    console.log(this.dashboardRecipes);
  }

  deleteRecipe() {
    let id: number;
    if (this.deleteThis.value != null) {
      let deleteValue = this.dashboardRecipes?.filter(recipe => recipe.name.toLowerCase() == this.deleteThis.value?.toLowerCase());
      if (deleteValue) {
        id = deleteValue[0].recipeId;
        this.accountService.postNewToken().subscribe({
          next: newToken => {
            localStorage["token"] = newToken.token;
            localStorage["refreshToken"] = newToken.refreshToken;
            this.recipeService.deleteRecipe(id).subscribe({
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

  addIngredient() {
    if (this.recipeForm.controls['ingredients'].value !== null
      && !this.ingredients.some(value => value.words == this.recipeForm.controls['ingredients'].value)
    ) {
      let newIngredient = new Ingredient(this.recipeForm.controls['ingredients'].value);
      this.ingredients.push(newIngredient);
      this.recipeForm.controls['ingredients'].reset();
    }
  }

  addInstruction() {
    if (this.recipeForm.controls['instructions'].value !== null
      && !this.instructions.some(value => value.words == this.recipeForm.controls['instructions'].value)
    ) {
      let newInstruction = new Instruction(this.recipeForm.controls['instructions'].value, this.instructions.length);
      this.instructions.push(newInstruction);
      this.recipeForm.controls['instructions'].reset();
    }
  }

  findRecipeFromSelectValue() {
    if (this.recipeForm.controls["name"].value != undefined && this.dashboardRecipes != undefined) {
      let selectedRecipe = this.dashboardRecipes
        .filter(recipe => recipe.name == this.recipeForm.controls["name"].value);
      console.log(selectedRecipe);
      return selectedRecipe;
    }
    return null;
  }

  submitRecipeEdit() {
    let recipeToEditId = this.findRecipeFromSelectValue()![0].recipeId;
    let editRecipe: RecipeFromDb = {
      recipeId: recipeToEditId,
      name: this.recipeForm.get('name')?.value,
      timeToPrepare: this.recipeForm.get('timeToPrepare')?.value,
      description: this.recipeForm.get('description')?.value,
      photo: this.recipeForm.get('photo')?.value,
      privacy: this.recipeForm.get('privacy')?.value,
      ingredients: this.ingredients,
      instructions: this.instructions
    };
    this.recipeService.putRecipe(recipeToEditId, editRecipe).subscribe({
      error: err => console.error(err)
    });
  }
}
