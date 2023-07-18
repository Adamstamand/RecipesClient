import { Recipe } from "./recipe";

export interface RecipeFunc {
    (): Recipe[] | undefined;
}