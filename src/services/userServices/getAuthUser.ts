import {IUserWithTokens} from "@/models/userModel/IUserWithTokens";
import {cookies} from "next/headers";
import {API_URL_AUTH} from "@/utils/constants";
import {refreshAccessToken} from "@/services/refreshAccessToken/refreshAccessToken";

export const getAuthUser = async (): Promise<IUserWithTokens | null> => {
    const cookieStore = await cookies();
    let token = cookieStore.get('accessToken')?.value;

    if (!token) {
        console.log('No accessToken, trying refreshToken...');
        token = await refreshAccessToken();
        if (!token) return null;
    }

    const response = await fetch(`${API_URL_AUTH}/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
    });

    if (!response.ok) {
        console.log('Failed to fetch user with token:', token);
        return null;
    }

    const user: IUserWithTokens = await response.json();
    user.accessToken = token;

    return user;
};