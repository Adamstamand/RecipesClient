import { inject } from '@angular/core';
import { Router, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RecipeFromDB } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { EMPTY, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const recipeResolver: ResolveFn<RecipeFromDB> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(RecipeService)
      .getSpecificRecipe(parseInt(route.paramMap.get('id')!))
      .pipe(catchError(err => handleError(err)));
  };

const handleError = (errorResponse: HttpErrorResponse) => {
  inject(Router).navigate;
  return EMPTY;
};