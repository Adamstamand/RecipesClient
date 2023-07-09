import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export class Recipe {
    name: string;
    description: string;
    instructions: Instruction[];
    ingredients: Ingredient[];
    timeToPrepare: number;
    photo: string;

    constructor(name: string, timeToPrepare: number,
        ingredients: Ingredient[],
        description: string,
        instructions: Instruction[],
        photo: string) {

        this.name = name;
        this.description = description;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.timeToPrepare = timeToPrepare;
        this.photo = photo;
    }
}