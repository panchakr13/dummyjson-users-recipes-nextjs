import Link from "next/link";
import { IRecipe } from "@/models/recipeModel/IRecipe";
import { getAuthRecipeById } from "@/services/recipeServices/getAuthRecipeById";

interface RecipeDetailPageProps {
    params: { id: string };
}

const RecipeDetailPage = async ({ params }: RecipeDetailPageProps) => {
    const awaitedParams = await params;
    const recipe: IRecipe | null = await getAuthRecipeById(awaitedParams.id);

    if (!recipe) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-2xl font-semibold text-gray-800">Please, log in</p>
                <Link href="/auth/login" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <header className="flex justify-between items-center mb-6">
                <Link href="/recipes" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Recipes
                </Link>
                <Link href="/users" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Users
                </Link>
            </header>
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">{recipe.name} ({recipe.mealType})</h1>
            {recipe.image && (
                <img src={recipe.image} alt={recipe.name} className="w-2/4 h-80 mx-auto object-cover rounded-lg shadow-md mb-6" />
            )}
            <div className="mb-6">
                <strong className="block text-lg text-gray-800">Tags:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.tags.map(tag => (
                        <Link key={tag} href={`/recipes/tag/${tag}`} className="text-sm text-green-700 bg-green-200 px-3 py-1 rounded-md hover:bg-green-300 transition">
                            #{tag}
                        </Link>
                    ))}
                </div>
            </div>
            <p className="mb-4 text-gray-800"><strong className="text-lg font-semibold">Ingredients:</strong> {recipe.ingredients}</p>
            <p className="mb-6 text-gray-800"><strong className="text-lg font-semibold">Instructions:</strong> {recipe.instructions}</p>
            <p>
                <strong className="text-lg font-semibold text-gray-800">User who cooked this recipe: </strong>
                <Link href={`/users/${recipe.userId}`} className="px-4 py-2 bg-green-900  text-white rounded-lg hover:bg-blue-800 transition shadow-md animate-pulse text-s">
                    click
                </Link>
            </p>
        </div>
    );
};

export default RecipeDetailPage;