"use client";

import { useState } from "react";
import {loginAction} from "@/app/api/auth/login/actions";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    return (
        <div>
            <h1>Login</h1>
            <form
                action={async (formData: FormData) => {
                    const result = await loginAction(formData);
                    if (result && "error" in result) {
                        setError(result.error);
                    }
                }}
            >
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
