import { IUser } from '@/models/userModel/IUser';
import {PaginationComponent} from "@/components/pagination/PaginationComponent";
import {getAuthUsers} from "@/services/userServices/getAuthUsers";
import Link from "next/link";
import {getAuthUsersSearch} from "@/services/userServices/getAuthUsersSearch";
import {SearchBar} from "@/components/searchBar/SearchBar";

interface UsersPageProps {
    searchParams?: {skip?: string ; q?: string};
}

const UsersPage = async ({ searchParams}: UsersPageProps)=> {
    const searchParamsData = await searchParams;
    const skip = searchParamsData?.skip ? parseInt(searchParamsData.skip, 10) : 0;
    const query = searchParamsData?.q || "";
    const users = query ? await getAuthUsersSearch(query) : await getAuthUsers(skip);

    if (!users) return (
        <div>
            <p>Please, log in</p>
            <Link href="/auth/login">Login</Link>
        </div>
    );

    return (
        <div>
            <header><Link href="/recipes">Recipes</Link></header>
            <h1>Users</h1>

            <SearchBar placeholder={'Search users'}/>
            <ul>
                {users.map((user: IUser) => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.id}. {user.firstName} {user.lastName}</Link>
                    </li>
                ))}
            </ul>
            <div>
                {!query && <PaginationComponent skip={skip}/>}
            </div>
        </div>
    );
}

export default UsersPage;