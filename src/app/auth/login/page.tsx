"use client";

import { useState } from "react";
import { loginAction } from "@/app/api/auth/login/actions";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Login</h1>
                <form
                    className="flex flex-col gap-4"
                    action={async (formData: FormData) => {
                        const result = await loginAction(formData);
                        if (result && "error" in result) {
                            setError(result.error);
                        }
                    }}
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:bg-blue-50"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full text-black  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:bg-blue-50"
                    />
                    <button
                        type="submit"
                        className="w-full animate-bounce bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 "
                    >
                        Login
                    </button>
                </form>
                {error && <p className="mt-2 text-center text-red-500">{error}</p>}
            </div>
        </div>
    );
}
