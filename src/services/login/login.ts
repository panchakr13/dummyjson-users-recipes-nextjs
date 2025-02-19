import {cookies} from "next/headers";
import {API_URL_AUTH} from "@/utils/constants";


export const login = async (username: string, password: string)=> {
    const res = await fetch(`${API_URL_AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Invalid credentials');

    const tokens = await res.json();
    const cookieStore = await cookies();
    cookieStore.set('accessToken', tokens.accessToken, { httpOnly: true });
    cookieStore.set('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
}