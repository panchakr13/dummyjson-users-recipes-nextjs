import { getAuthUsers } from '@/lib/auth';
import { IUser } from '@/models/userModel/IUser';

export default async function UsersPage() {
    const users = await getAuthUsers();
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
        </div>
    );
}
