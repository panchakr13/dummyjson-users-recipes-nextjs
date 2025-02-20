import Link from "next/link";
import { getAuthUser } from "@/services/userServices/getAuthUser";

export default async function Menu() {
    const user = await getAuthUser();

    return (
        <nav className="flex items-center justify-center bg-white p-4 rounded-lg shadow-md">
            {user ? (
                <div className="flex items-center gap-6">
                    <Link href="/users" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                        Users
                    </Link>
                    <Link href="/recipes" className="text-gray-700 hover:text-green-600 font-semibold transition">
                        Recipes
                    </Link>
                    <img
                        src={user.image}
                        alt={user.username}
                        className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-sm"
                    />
                </div>
            ) : (
                <Link
                    href="/auth/login"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                    Login
                </Link>
            )}
        </nav>
    );
}
