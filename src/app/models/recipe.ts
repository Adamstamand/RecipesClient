import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
    name: string;
    description: string;
    instructions: Instruction[];
    ingredients: Ingredient[];
    timeToPrepare: number;
    photo: string;
    privacy: string;
}