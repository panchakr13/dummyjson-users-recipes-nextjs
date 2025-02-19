import Menu from "@/components/menu/Menu";
import Link from "next/link";
import {getAuthUser} from "@/services/userServices/getAuthUser";

export default async function HomePage() {
    const user = await getAuthUser()
    return (
        <div>
            {user ? (
                <>
                    <h4>Welcome to the main page, you are authorized.</h4>
                    <Menu/>
                </>
            ) : (
                <>
                    <h3>Welcome!</h3>
                    <span>Please login to access users and recipes!</span>
                    <Link href={'/auth/login'}>Вхід</Link>
                </>
            )}
        </div>
    );
}
