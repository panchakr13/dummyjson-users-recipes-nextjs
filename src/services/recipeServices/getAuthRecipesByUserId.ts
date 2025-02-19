import { API_URL_AUTH } from "@/utils/constants";
import { getAuthRecipe } from "@/services/recipeServices/getAuthRecipe";
import { IRecipe } from "@/models/recipeModel/IRecipe";
import { IRecipesResponseModelType } from "@/models/recipeModel/IRecipeResponseModelType";

export const getAuthRecipesByUserId = async (userId: string): Promise<IRecipe[] | null> => {
    const recipe = await getAuthRecipe();
    if (!recipe) return null;

    const res = await fetch(`${API_URL_AUTH}/recipes`, {
        headers: { Authorization: `Bearer ${recipe.accessToken}` },
    });

    if (!res.ok) {
        console.log(`Failed to fetch recipes`);
        return null;
    }

    const data: IRecipesResponseModelType = await res.json();

    return data.recipes.filter((r) => r.userId.toString() === userId);
};
