import { cookies } from 'next/headers';
import {IUserWithTokens} from "@/models/userModel/IUserWithTokens";
import {IUsersResponseModelType} from "@/models/userModel/IUserResponseModelType";
import {IUser} from "@/models/userModel/IUser";

const API_URL = 'https://dummyjson.com/auth';

export const login = async (username: string, password: string)=> {
    const res = await fetch(`${API_URL}/login`, {
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


export const getAuthUser = async (): Promise<IUserWithTokens | null> => {
    const cookieStore = await cookies();
    let token = cookieStore.get('accessToken')?.value;

    if (!token) {
        console.log('No accessToken, trying refreshToken...');
        token = await refreshAccessToken();
        if (!token) return null;
    }

    const response = await fetch(`${API_URL}/me`, {
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

export const getAuthUsers = async (skip: number): Promise<IUser[] | null> => {
    const user = await getAuthUser();
    if (!user) return null;

    const res = await fetch(`https://dummyjson.com/auth/users?limit=10&skip=${skip}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });

    if (!res.ok) {
        console.log('Failed to fetch users');
        return null;
    }

    const data: IUsersResponseModelType = await res.json();
    return data.users;
};


export const refreshAccessToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        console.log('No refreshToken found');
        return null;
    }

    const res = await fetch(`${API_URL}/refresh`, {
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
