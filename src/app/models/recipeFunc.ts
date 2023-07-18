import { RecipeWithId } from "./recipeWithId";

export interface RecipeFunc {
    (): RecipeWithId[] | undefined;
}