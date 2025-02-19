import {cookies} from "next/headers";
import {API_URL_AUTH} from "@/utils/constants";

export const refreshAccessToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        console.log('No refreshToken found');
        return null;
    }

    const res = await fetch(`${API_URL_AUTH}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include',
    });

    if (!res.ok) {
        console.log('Failed to refresh token:', await res.text());
        return null;
    }

    const data = await res.json();

    cookieStore.set('accessToken', data.accessToken, { httpOnly: true });
    cookieStore.set('refreshToken', data.refreshToken, { httpOnly: true });

    console.log('New accessToken:', data.accessToken);

    return data.accessToken;
};