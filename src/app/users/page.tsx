import { IUser } from '@/models/userModel/IUser';
import { PaginationComponent } from '@/components/pagination/PaginationComponent';
import { getAuthUsers } from '@/services/userServices/getAuthUsers';
import { getAuthUsersSearch } from '@/services/userServices/getAuthUsersSearch';
import Link from 'next/link';
import { SearchBar } from '@/components/searchBar/SearchBar';

interface UsersPageProps {
    searchParams?: { skip?: string; q?: string };
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
    const searchParamsData = await searchParams;
    const skip = searchParamsData?.skip ? parseInt(searchParamsData.skip, 10) : 0;
    const query = searchParamsData?.q || '';
    const users = query ? await getAuthUsersSearch(query) : await getAuthUsers(skip);

    if (!users) return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-white">
            <p className="text-xl font-semibold">Please, log in</p>
            <Link href="/auth/login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen">
            <header className="flex justify-between items-center mb-6">
                <Link href="/recipes" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Recipes</Link>
                <SearchBar placeholder="Search users..." />
            </header>
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-950">Users</h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user: IUser) => (
                    <li key={user.id} className="bg-gray-50 shadow-md p-4 rounded-lg hover:shadow-lg transition border border-white">
                        <Link href={`/users/${user.id}`} className="flex flex-col items-center">
                            {user.image && <img src={user.image} alt={user.lastName} className="w-20 h-20 rounded-full mb-2 border border-gray-300 shadow-sm" />}
                            <span className="text-lg font-semibold text-blue-500">{user.id}. {user.firstName} {user.lastName}</span>
                        </Link>
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

export default UsersPage;
