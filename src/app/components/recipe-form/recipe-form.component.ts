import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';
import { RecipeFormService } from 'src/app/services/recipe-form.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup = this.recipeFormService.recipeForm;
  ingredientsForm: FormControl = this.recipeFormService.ingredientsForm;
  instructionsForm: FormControl = this.recipeFormService.instructionsForm;
  ingredients: Ingredient[] = this.recipeFormService.ingredients;
  instructions: Instruction[] = this.recipeFormService.instructions;

  constructor(private recipeFormService: RecipeFormService) { }

  ngOnInit() {
    this.recipeFormService.resetAllValues();
  }

  addIngredient() {
    if (this.ingredientsForm.valid) {
      let newIngredient = new Ingredient(this.ingredientsForm.value!.trim());
      this.ingredients.push(newIngredient);
      this.ingredientsForm.reset();
    }
  }

  removeIngredient(event: Event) {
    let eventValue: string = (event.target as HTMLInputElement).value;
    let indexToRemove = this.ingredients.findIndex(ingredient => ingredient.words == eventValue);
    this.ingredients.splice(indexToRemove, 1);
  }

  addInstruction() {
    if (this.instructionsForm.valid) {
      let newInstruction = new Instruction(this.instructionsForm.value!.trim(), this.instructions.length);
      this.instructions.push(newInstruction);
      this.instructionsForm.reset();
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
}
