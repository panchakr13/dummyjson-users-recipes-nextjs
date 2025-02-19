import { IUser } from "@/models/userModel/IUser";
import Link from "next/link";
import {getAuthUserById} from "@/services/userServices/getAuthUserById";
import {IRecipe} from "@/models/recipeModel/IRecipe";
import {getAuthRecipesByUserId} from "@/services/recipeServices/getAuthRecipesByUserId";

interface UserDetailPageProps {
    params: { id: string };
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
    const user: IUser | null = await getAuthUserById(params.id);
    const recipes: IRecipe[] | null = await getAuthRecipesByUserId(params.id)

    if (!user) {
        return (
            <div>
                <p>Please, log in</p>
                <Link href="/auth/login">Login</Link>
            </div>
        );
    }

    return (
        <div>
            <header>
                <div><Link href="/recipes">Recipes</Link></div>
                <div><Link href="/users">Users</Link></div>
            </header>
            <h1>{user.id}. {user.firstName} {user.lastName}</h1>
            <img src={user.image} alt={user.lastName}/>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>BirthDate:</strong> {user.birthDate}</p>
            <p><strong>Country:</strong> {user.address.country}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <h2>Recipes of this user:</h2>
            {recipes && recipes.length > 0 ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link href={`/recipes/${recipe.id}`} className="text-blue-500 underline">
                                {recipe.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>This user has not added any recipes yet.</p>
            )}
        </div>
    );
};

export default UserDetailPage;
