import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { RecipeFromDb } from 'src/app/models/recipeFromDb';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipe?: RecipeFromDb;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private route: Router) { }

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
  }

  whatsTheRecipe() {
    console.log(this.recipe);
  }
}

