import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Instruction } from '../../models/instruction';
import { Ingredient } from '../../models/ingredient';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/authenticationResponse';
import { IngredientAndInstructionValidator } from 'src/app/validators/ingredientAndInstructionValidator';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];
  isLoggedIn: boolean = false;

  recipeForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    timeToPrepare: ['', [Validators.required, Validators.max(1440)]],
    privacy: ['public', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    photo: ['', [Validators.maxLength(500), Validators.pattern("^https:\/\/images\.unsplash\.com\/.*")]],
  });

  ingredientsForm = new FormControl('', [Validators.required, Validators.maxLength(100),
  IngredientAndInstructionValidator(() => this.ingredients)]);

  instructionsForm = new FormControl('', [Validators.required, Validators.maxLength(100),
  IngredientAndInstructionValidator(() => this.instructions)]);

  constructor(private recipeService: RecipeService, private formbuilder: FormBuilder,
    private accountService: AccountService, private router: Router) { };

  ngOnInit(): void {
    this.accountService.postNewToken().subscribe({
      next: newToken => {
        localStorage["token"] = newToken.token;
        localStorage["refreshToken"] = newToken.refreshToken;
        this.accountService.isLoggedIn = true;
        this.isLoggedIn = true;
      },
      error: err => {
        console.error(err);
        this.router.navigate(['/log-in']);
      }
    });
  }

  addIngredient() {
    let newIngredient = new Ingredient(this.ingredientsForm.value!.trim());
    this.ingredients.push(newIngredient);
    this.ingredientsForm.reset();
  }

  removeIngredient(event: Event) {
    let eventValue: string = (event.target as HTMLInputElement).value;
    let indexToRemove = this.ingredients.findIndex(ingredient => ingredient.words == eventValue);
    this.ingredients.splice(indexToRemove, 1);
  }

  addInstruction() {
    let newInstruction = new Instruction(this.instructionsForm.value!.trim(), this.instructions.length);
    this.instructions.push(newInstruction);
    this.instructionsForm.reset();
  }

  removeInstruction(event: Event) {
    let eventValue: string = (event.target as HTMLInputElement).value;
    let indexToRemove = this.instructions.findIndex(instruction => instruction.words == eventValue);
    this.instructions.splice(indexToRemove, 1);
    for (let i = 0; i < this.instructions.length; i++) {
      this.instructions[i].position = i;
    }
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
