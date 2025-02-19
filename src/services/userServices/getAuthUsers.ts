import {IUser} from "@/models/userModel/IUser";
import {IUsersResponseModelType} from "@/models/userModel/IUserResponseModelType";
import {getAuthUser} from "@/services/userServices/getAuthUser";
import {API_URL_AUTH} from "@/utils/constants";

export const getAuthUsers = async (skip: number): Promise<IUser[] | null> => {
    const user = await getAuthUser();
    if (!user) return null;

    const res = await fetch(`${API_URL_AUTH}/users?limit=10&skip=${skip}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });

    if (!res.ok) {
        console.log('Failed to fetch users');
        return null;
    }

    const data: IUsersResponseModelType = await res.json();
    return data.users;
};