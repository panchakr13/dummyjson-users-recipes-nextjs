import { getAuthRecipesByTag } from "@/services/recipeServices/getAuthRecipesByTag";
import Link from "next/link";

interface RecipesByTagPageProps {
    params: { tag: string };
}

const RecipesByTagPage = async ({ params }: RecipesByTagPageProps) => {
    const awaitedParams = await params;
    const tag = awaitedParams.tag;
    const recipes = await getAuthRecipesByTag(tag);

    if (!recipes) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-xl font-semibold">Please, log in</p>
                <Link href="/auth/login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-4 text-green-950">Recipes with tag: {tag}</h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition">
                        <Link href={`/recipes/${recipe.id}`} className="flex flex-col items-center">
                            {recipe.image && <img src={recipe.image} alt={recipe.name} className="w-32 h-32 object-cover rounded-full mb-2" />}
                            <span className="text-lg font-semibold text-center text-green-700">{recipe.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipesByTagPage;
