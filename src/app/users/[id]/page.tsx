import { IUser } from '@/models/userModel/IUser';
import Link from 'next/link';
import { getAuthUserById } from '@/services/userServices/getAuthUserById';
import { IRecipe } from '@/models/recipeModel/IRecipe';
import { getAuthRecipesByUserId } from '@/services/recipeServices/getAuthRecipesByUserId';

interface UserDetailPageProps {
    params: Promise< { id: string } >;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
    const { id } = await params;
    const user: IUser | null = await getAuthUserById(id);
    const recipes: IRecipe[] | null = await getAuthRecipesByUserId(id);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-xl font-semibold">Please, log in</p>
                <Link href="/auth/login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <header className="flex justify-between mb-6">
                <Link href="/recipes" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Recipes</Link>
                <Link href="/users" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Users</Link>
            </header>

            <div className="text-center">
                {user.image && <img src={user.image} alt={user.lastName} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500" />}
                <h1 className="text-2xl font-bold text-blue-600">{user.id}. {user.firstName} {user.lastName}</h1>
                <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
                <p className="text-lg text-gray-700"><strong>Phone:</strong> {user.phone}</p>
                <p className="text-lg text-gray-700"><strong>BirthDate:</strong> {user.birthDate}</p>
                <p className="text-lg text-gray-700"><strong>Country:</strong> {user.address.country}</p>
                <p className="text-lg text-gray-700"><strong>City:</strong> {user.address.city}</p>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl text-gray-800 font-semibold mb-2 text-center">Recipes of this user:</h2>
                {recipes && recipes.length > 0 ? (
                    <ul className="list-none space-y-2 text-center">
                        {recipes.map((recipe) => (
                            <li key={recipe.id}>
                                <Link href={`/recipes/${recipe.id}`} className="block text-blue-500 font-semibold hover:underline">
                                    {recipe.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">This user has not added any recipes yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailPage;
