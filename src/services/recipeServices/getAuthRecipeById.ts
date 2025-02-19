import {API_URL_AUTH} from "@/utils/constants";
import {getAuthRecipe} from "@/services/recipeServices/getAuthRecipe";
import {IRecipe} from "@/models/recipeModel/IRecipe";

export const getAuthRecipeById = async (id: string): Promise<IRecipe | null> => {
    const recipe = await getAuthRecipe();
    if (!recipe) return null;

    const res = await fetch(`${API_URL_AUTH}/recipes/${id}`, {
        headers: { Authorization: `Bearer ${recipe.accessToken}` },
    });

    if (!res.ok) {
        console.log(`Failed to fetch recipe with id: ${id}`);
        return null;
    }

    return res.json();
};