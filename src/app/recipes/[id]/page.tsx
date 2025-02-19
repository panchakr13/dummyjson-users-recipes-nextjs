import Link from "next/link";
import {IRecipe} from "@/models/recipeModel/IRecipe";
import {getAuthRecipeById} from "@/services/recipeServices/getAuthRecipeById";

interface RecipeDetailPageProps {
    params: { id: string };
}

const RecipeDetailPage = async ({ params }: RecipeDetailPageProps) => {
    const awaitedParams = await params;
    const recipe: IRecipe | null = await getAuthRecipeById(awaitedParams.id);

    if (!recipe) {
        return (
            <div>
                <p>Please, log in</p>
                <Link href="/auth/login">Login</Link>
            </div>);
    }

    return (
        <div>
            <header>
                <div><Link href="/users">Recipes</Link></div>
                <div><Link href="/recipes">Users</Link></div>
            </header>
            <h1>{recipe.name} {recipe.mealType}</h1>
            <img src={recipe.image} alt={recipe.name} width={150}/>
            <p><strong>Tags:</strong> {recipe.tags}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p>
                <strong>User, who cooked this recipe: </strong>
                <Link href={`/users/${recipe.userId}`} className="text-blue-500 underline">
                    {recipe.userId}
                </Link>
            </p>
        </div>
    );
};

export default RecipeDetailPage;
