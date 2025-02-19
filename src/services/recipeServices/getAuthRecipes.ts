import {API_URL_AUTH} from "@/utils/constants";
import {IRecipesResponseModelType} from "@/models/recipeModel/IRecipeResponseModelType";
import {getAuthRecipe} from "@/services/recipeServices/getAuthRecipe";
import {IRecipe} from "@/models/recipeModel/IRecipe";

export const getAuthRecipes = async (skip: number): Promise<IRecipe[] | null> => {
    const recipe = await getAuthRecipe();
    if (!recipe) return null;

    const res = await fetch(`${API_URL_AUTH}/recipes?limit=10&skip=${skip}`, {
        headers: { Authorization: `Bearer ${recipe.accessToken}` },
    });

    if (!res.ok) {
        console.log('Failed to fetch recipes');
        return null;
    }

    const data: IRecipesResponseModelType = await res.json();
    return data.recipes;
};