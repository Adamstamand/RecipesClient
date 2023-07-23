import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';
import { Recipe } from 'src/app/models/recipe';
import { AccountService } from 'src/app/services/account.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipe?: Recipe;
  instructions?: Instruction[];
  ingredients?: Ingredient[];

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private route: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        return this.recipeService.getSpecificRecipe(Number(params.get('id')));
      })).subscribe({
        next: recipe => {
          this.recipe = recipe;
          this.instructions = recipe.instructions.sort((a, b) => a.position - b.position);
          this.ingredients = recipe.ingredients.sort((a, b) => a.position - b.position);
        },
        error: err => {
          console.error(err);
          this.route.navigate(['not-found']);
        }
      });
    this.accountService.refreshTokenOnlyIfTokenCurrentlyExists();
  }
}
