import { IRecipe } from "@/models/recipeModel/IRecipe";
import { API_URL_AUTH } from "@/utils/constants";
import { getAuthRecipe } from "@/services/recipeServices/getAuthRecipe";

export const getAuthRecipesByTag = async (tag: string): Promise<IRecipe[] | null> => {
    const recipe = await getAuthRecipe();
    if (!recipe) return null;

    const res = await fetch(`${API_URL_AUTH}/recipes/tag/${tag}`, {
        headers: { Authorization: `Bearer ${recipe.accessToken}` },
    });

    if (!res.ok) {
        console.log('Failed to fetch recipes by tag');
        return null;
    }

    const data = await res.json();
    return data.recipes;
};
