import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FourohfourComponent } from './fourohfour/fourohfour.component';
import { recipeResolver } from './resolvers/recipe.resolver';

const routes: Routes = [
  { path: 'recipe/:id', component: RecipeComponent, resolve: { resolvedRecipe: recipeResolver } },
  { path: 'not-found', component: FourohfourComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'addrecipe', component: AddrecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
