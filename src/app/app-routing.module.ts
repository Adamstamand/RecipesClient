import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './components/recipes/recipes.component';
import { AddrecipeComponent } from './components/addrecipe/addrecipe.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'add-recipe', component: AddrecipeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'log-in', component: LoginComponent },
  { path: '', component: RecipesComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
