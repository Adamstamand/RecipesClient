export class Recipe {
    name: string;
    description: string;
    instructions: string[];
    ingredients: string[];
    timeToPrepare: number;
    photo: string;

    constructor(name: string, timeToPrepare: number,
        ingredients: string[],
        description: string,
        instructions: string[],
        photo: string) {

        this.name = name;
        this.description = description;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.timeToPrepare = timeToPrepare;
        this.photo = photo;
    }
}