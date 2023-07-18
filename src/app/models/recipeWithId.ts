import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface RecipeWithId {
    recipeId: number;
    name: string;
    description: string;
    instructions: Instruction[];
    ingredients: Ingredient[];
    timeToPrepare: number;
    photo: string;
    privacy: string;
}