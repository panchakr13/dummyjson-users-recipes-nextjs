import { API_URL_AUTH } from "@/utils/constants";
import {IRecipe} from "@/models/recipeModel/IRecipe";
import {getAuthRecipe} from "@/services/recipeServices/getAuthRecipe";
import {IRecipesResponseModelType} from "@/models/recipeModel/IRecipeResponseModelType";

export const getAuthRecipesSearch = async (query: string): Promise<IRecipe[] | null> => {
    const recipe = await getAuthRecipe();
    if (!recipe) return null;

    const res = await fetch(`${API_URL_AUTH}/recipes/search?q=${query}`, {
        headers: { Authorization: `Bearer ${recipe.accessToken}` },
    });

    if (!res.ok) {
        console.log(`Failed to fetch recipes with query: ${query}`);
        return null;
    }

    const data: IRecipesResponseModelType = await res.json();
    return data.recipes;
};
