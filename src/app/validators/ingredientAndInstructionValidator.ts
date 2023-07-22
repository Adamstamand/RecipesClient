import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { RecipeFunc } from "../models/recipeFunc";

export function IngredientAndInstructionValidator(listToValidate: RecipeFunc): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value !== null &&
            control.value.trim() !== "" &&
            !listToValidate()!.some(listItem =>
                listItem.words.toLowerCase() == control.value.trim().toLowerCase())) {
            return null;
        }
        if (control.value === null ||
            control.value === "" ||
            control.value.trim() === "") {
            return { emptyInput: control.value };
        }
        if (listToValidate()!.some(listItem =>
            listItem.words.toLowerCase() == control.value.trim().toLowerCase())) {
            control.setErrors({ duplicate: control.value });
            return { duplicate: control.value };
        }
        return { invalid: control.value };
    };
}