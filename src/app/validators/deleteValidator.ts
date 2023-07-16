import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { RecipeFunc } from "../models/recipeFunc";

export function DeleteValidator(dashboardRecipes: RecipeFunc): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const recipeExists = dashboardRecipes()?.some(recipe => recipe.name.toLowerCase() == control.value.toLowerCase());
        return recipeExists ? null : { noRecipe: { value: control.value } };
    };
}