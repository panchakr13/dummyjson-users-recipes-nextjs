import Menu from "@/components/menu/Menu";
import Link from "next/link";
import { getAuthUser } from "@/services/userServices/getAuthUser";

export default async function HomePage() {
    const user = await getAuthUser();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
            {user ? (
                <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the main page, you are authorized.</h1>
                    <Menu />
                </div>
            ) : (
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
                    <p className="text-gray-600 mb-4">Please login to access users and recipes!</p>
                    <Link
                        href="/auth/login"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
}
