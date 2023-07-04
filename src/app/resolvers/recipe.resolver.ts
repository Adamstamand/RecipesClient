import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RecipeFromDB } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

export const recipeResolver: ResolveFn<RecipeFromDB> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(RecipeService)
      .getSpecificRecipe(parseInt(route.paramMap.get('id')!));
  };