import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FourohfourComponent } from './fourohfour/fourohfour.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    AddrecipeComponent,
    RecipeComponent,
    FourohfourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
