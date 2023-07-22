import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IngredientAndInstructionValidator } from 'src/app/validators/ingredientAndInstructionValidator';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];

  recipeForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    timeToPrepare: ['', [Validators.required, Validators.max(1440), Validators.min(0)]],
    privacy: ['public', { nonNullable: true, validators: Validators.required }],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    photo: ['', [Validators.maxLength(500), Validators.pattern("^https:\/\/images\.unsplash\.com\/.*")]],
  });

  ingredientsForm = new FormControl('', [Validators.required, Validators.maxLength(100),
  IngredientAndInstructionValidator(() => this.ingredients)]);

  instructionsForm = new FormControl('', [Validators.required, Validators.maxLength(100),
  IngredientAndInstructionValidator(() => this.instructions)]);

  constructor(private formbuilder: FormBuilder) { }

  resetAllValues() {
    this.recipeForm.reset();
    this.ingredientsForm.reset();
    this.instructionsForm.reset();
    this.ingredients.length = 0;
    this.instructions.length = 0;
  }
}
