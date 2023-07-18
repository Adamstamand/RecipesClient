import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private route: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        return this.recipeService.getSpecificRecipe(Number(params.get('id')));
      })).subscribe({
        next: value => {
          this.recipe = value;
        },
        error: err => {
          console.error(err);
          this.route.navigate(['not-found']);
        }
      });
    this.accountService.refreshTokenOnlyIfTokenCurrentlyExists();
  }
}
