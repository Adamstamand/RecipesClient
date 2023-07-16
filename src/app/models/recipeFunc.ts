import { RecipeFromDb } from "./recipeFromDb";

export interface RecipeFunc {
    (): RecipeFromDb[] | undefined;
}