import { getAuthUsers } from '@/lib/auth';
import { IUser } from '@/models/userModel/IUser';
import {PaginationComponent} from "@/components/pagination/PaginationComponent";

interface UsersPageProps {
    searchParams?: {skip?: string };
}

    const UsersPage = async ({ searchParams}: UsersPageProps)=> {
    const searchParamsData = await searchParams;
    const skip = searchParamsData?.skip ? parseInt(searchParamsData.skip, 10) : 0;
    const users = await getAuthUsers(skip);
    if (!users) return <p>Спочатку увійдіть в систему.</p>;

    return (
        <div>
            <h1>Користувачі</h1>
            <ul>
                {users.map((user: IUser) => (
                    <li key={user.id}>
                        <a href={`/users/${user.id}`}>{user.firstName} {user.lastName}</a>
                    </li>
                ))}
            </ul>
            <div>
                <PaginationComponent skip={skip}/>
            </div>
        </div>
    );
}

export default UsersPage;