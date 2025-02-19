import {IRecipe} from "@/models/recipeModel/IRecipe";

export interface IRecipesResponseModelType{
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}