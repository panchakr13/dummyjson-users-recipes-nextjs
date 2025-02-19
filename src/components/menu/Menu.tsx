
import Link from "next/link";
import {getAuthUser} from "@/services/userServices/getAuthUser";

export default async function Menu() {
    const user = await getAuthUser();

    return (
        <nav>
            {user ? (
                <>
                    <div><Link href="/users">Users</Link></div>
                    <div><Link href="/recipes">Recipes</Link></div>
                    <img src={user.image} alt={user.username} width="40" height="40" />
                </>
            ) : (
                <Link href="/auth/login">Login</Link>
            )}
        </nav>
    );
}
