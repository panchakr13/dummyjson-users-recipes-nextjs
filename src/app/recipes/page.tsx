import {PaginationComponent} from "@/components/pagination/PaginationComponent";
import {IRecipe} from "@/models/recipeModel/IRecipe";
import {getAuthRecipes} from "@/services/recipeServices/getAuthRecipes";
import Link from "next/link";
import {getAuthRecipesSearch} from "@/services/recipeServices/getAuthRecipesSearch";
import {SearchBar} from "@/components/searchBar/SearchBar";

interface RecipesPageProps {
    searchParams?: {skip?: string; q?: string };
}

const RecipesPage = async ({ searchParams}: RecipesPageProps)=> {
    const searchParamsData = await searchParams;
    const skip = searchParamsData?.skip ? parseInt(searchParamsData.skip, 10) : 0;
    const query = searchParamsData?.q || '';
    const recipes = query? await getAuthRecipesSearch(query): await getAuthRecipes(skip);

    if (!recipes) return (
        <div>
            <p>Please, log in</p>
            <Link href="/auth/login">Login</Link>
        </div>);


    return (
        <div>
            <header><Link href="/users">Users</Link></header>
            <h1>Recipes: </h1>
            <SearchBar placeholder={'Search recipes'}/>

            <ul>
                {recipes.map((recipe: IRecipe) => (
                    <li key={recipe.id}>
                        <a href={`/recipes/${recipe.id}`}>{recipe.id}. {recipe.name} tags: {recipe.tags}</a>
                    </li>
                ))}
            </ul>
            <div>
                {!query && <PaginationComponent skip={skip}/>}
            </div>
        </div>
    );
}

export default RecipesPage;