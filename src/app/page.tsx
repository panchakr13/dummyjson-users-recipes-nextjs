import Menu from "@/components/Menu";
import {getAuthUser} from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
    const user = await getAuthUser()
    return (
        <div>
            {user ? (
                <>
                    <h4>Вітаємо на головній сторінці, ви авторизовані.</h4>
                    <Menu/>
                </>
            ) : (
                <>
                    <h3>Вітаємо!</h3>
                    <span>Будь ласка, увійдіть, щоб отримати доступ до користувачів та рецептів!</span>
                    <Link href={'/auth/login'}>Вхід</Link>
                </>
            )}
        </div>
    );
}
