import { PaginationComponent } from "@/components/pagination/PaginationComponent";
import { IRecipe } from "@/models/recipeModel/IRecipe";
import { getAuthRecipes } from "@/services/recipeServices/getAuthRecipes";
import { getAuthRecipesSearch } from "@/services/recipeServices/getAuthRecipesSearch";
import Link from "next/link";
import { SearchBar } from "@/components/searchBar/SearchBar";

interface RecipesPageProps {
    searchParams?: { skip?: string; q?: string };
}

const RecipesPage = async ({ searchParams }: RecipesPageProps) => {
    const searchParamsData = await searchParams;
    const skip = searchParamsData?.skip ? parseInt(searchParamsData.skip, 10) : 0;
    const query = searchParamsData?.q || "";
    const recipes = query ? await getAuthRecipesSearch(query) : await getAuthRecipes(skip);

    if (!recipes) return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <p className="text-xl font-semibold">Please, log in</p>
            <Link href="/auth/login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-6">
            <header className="flex justify-between items-center mb-6">
                <Link href="/users" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">Users</Link>
                <SearchBar placeholder="Search recipes..." />
            </header>
            <h1 className="text-2xl font-bold text-center mb-4 text-green-950">Recipes</h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe: IRecipe) => (
                    <li key={recipe.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition">
                        <Link href={`/recipes/${recipe.id}`} className="flex flex-col items-center">
                            {recipe.image && <img src={recipe.image} alt={recipe.name} className="w-32 h-32 object-cover rounded-full mb-2" />}
                            <span className="text-lg font-semibold text-center text-green-800">{recipe.name}</span>
                        </Link>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center">
                            {recipe.tags.map(tag => (
                                <Link key={tag} href={`/recipes/tag/${tag}`} className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-md hover:bg-green-300">
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>

            {!query && (
                <div className="flex justify-center mt-6">
                    <PaginationComponent skip={skip} />
                </div>
            )}
        </div>
    );
};

export default RecipesPage;