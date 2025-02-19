import { getAuthRecipesByTag } from "@/services/recipeServices/getAuthRecipesByTag";
import Link from "next/link";

interface RecipesByTagPageProps {
    params: { tag: string };
}

const RecipesByTagPage = async ({ params }: RecipesByTagPageProps) => {
    const awaitedParams = await params;
    const tag = awaitedParams.tag
    const recipes = await getAuthRecipesByTag(tag);

    if (!recipes) {
        return (
            <div>
                <p>Please, log in</p>
                <Link href="/auth/login">Login</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Recipes with tag: {tag}</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link href={`/recipes/${recipe.id}`}>
                            {recipe.id}. {recipe.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipesByTagPage;
