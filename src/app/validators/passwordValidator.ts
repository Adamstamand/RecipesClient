import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";

export function CompareValidation(controlToValidate: string, controlToCompare: string): ValidatorFn {
    return (formGroupAsControl: AbstractControl): ValidationErrors | null => {
        const formGroup = formGroupAsControl as FormGroup;
        const control = formGroup.controls[controlToValidate];
        const matchingControl = formGroup.controls[controlToCompare];

        if (matchingControl.value !== "" &&
            control.value !== "" &&
            control.value !== matchingControl.value) {
            formGroup.get(controlToCompare)?.setErrors({ noMatch: "The passwords don't match" });
            return { noMatch: "The passwords don't match" };
        }
        else {
            formGroup.get(controlToCompare)?.setErrors(null);
            return null;
        }
    };
}