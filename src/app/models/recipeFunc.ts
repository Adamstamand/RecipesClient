import { Ingredient } from "./ingredient";

export interface RecipeFunc {
    (): Ingredient[] | undefined;
}