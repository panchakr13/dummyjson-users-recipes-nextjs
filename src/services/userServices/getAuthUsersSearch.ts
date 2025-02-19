import { API_URL_AUTH } from "@/utils/constants";
import { IUser } from "@/models/userModel/IUser";
import {getAuthUser} from "@/services/userServices/getAuthUser";
import {IUsersResponseModelType} from "@/models/userModel/IUserResponseModelType";

export const getAuthUsersSearch = async (query: string): Promise<IUser[] | null> => {
    const user = await getAuthUser();
    if (!user) return null;

    const res = await fetch(`${API_URL_AUTH}/users/search?q=${query}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });

    if (!res.ok) {
        console.log(`Failed to fetch users with query: ${query}`);
        return null;
    }

    const data: IUsersResponseModelType = await res.json();
    return data.users;
};
