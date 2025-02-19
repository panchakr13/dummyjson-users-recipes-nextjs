"use server";

import { cookies } from "next/headers";
import { API_URL_AUTH } from "@/utils/constants";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { error: "Please, enter your login and password" };
    }

    const res = await fetch(`${API_URL_AUTH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.message || "Incorrect data" };
    }

    const tokens = await res.json();
    const cookieStore = await cookies();

    cookieStore.set("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
    });
    cookieStore.set("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
    });

    redirect("/");
}
