import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RecipeWithId } from 'src/app/models/recipeWithId';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardRecipes?: RecipeWithId[];
  isLoggedIn: boolean = false;
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];

  deleteThis = new FormControl('', Validators.required);

  recipeForm: FormGroup = this.formbuilder.group({
    selectRecipe: ['', Validators.required],
    name: ['', Validators.required],
    timeToPrepare: ['', Validators.required],
    ingredients: [''],
    privacy: ['public', Validators.required],
    description: ['', Validators.required],
    instructions: [''],
    photo: ['', Validators.pattern("^https:\/\/images\.unsplash\.com\/.*")],
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
          next: (dashboardRecipes: RecipeWithId[]) => {
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

    this.recipeForm.get('selectRecipe')!.valueChanges.subscribe({
      next: () => {
        let selectedRecipe = this.findRecipeFromSelectValue()![0];
        this.recipeForm.patchValue({
          name: selectedRecipe.name,
          timeToPrepare: selectedRecipe.timeToPrepare,
          privacy: selectedRecipe.privacy,
          description: selectedRecipe.description,
          photo: selectedRecipe.photo
        });
        this.ingredients = [];
        this.instructions = [];
        for (let ingredient of selectedRecipe.ingredients) {
          this.ingredients.push(ingredient);
        }
        for (let instruction of selectedRecipe.instructions) {
          this.instructions.push(instruction);
        }
      }
    }
    );
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

  removeIngredient(event: Event) {
    let eventValue: string = (event.target as HTMLInputElement).value;
    let indexToRemove = this.ingredients.findIndex(ingredient => ingredient.words == eventValue);
    this.ingredients.splice(indexToRemove, 1);
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
  }

  removeInstruction(event: Event) {
    let eventValue: string = (event.target as HTMLInputElement).value;
    let indexToRemove = this.instructions.findIndex(instruction => instruction.words == eventValue);
    this.instructions.splice(indexToRemove, 1);
    for (let i = 0; i < this.instructions.length; i++) {
      this.instructions[i].position = i;
    }
  }

  findRecipeFromSelectValue() {
    if (this.recipeForm.get("selectRecipe")!.value != undefined && this.dashboardRecipes != undefined) {
      let selectedRecipe = this.dashboardRecipes
        .filter(recipe => recipe.name == this.recipeForm.get("selectRecipe")!.value);
      return selectedRecipe;
    }
    return null;
  }

  submitRecipeEdit() {
    let recipeToEditId = this.findRecipeFromSelectValue()![0].recipeId;
    let editRecipe: RecipeWithId = {
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
      next: () => this.router.navigate([`recipe/${recipeToEditId}`]),
      error: err => console.error(err)
    });
  }
}
