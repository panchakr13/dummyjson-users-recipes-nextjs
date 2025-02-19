import {IUser} from "@/models/userModel/IUser";
import {getAuthUser} from "@/services/userServices/getAuthUser";
import {API_URL_AUTH} from "@/utils/constants";

export const getAuthUserById = async (id: string): Promise<IUser | null> => {
    const user = await getAuthUser();
    if (!user) return null;

    const res = await fetch(`${API_URL_AUTH}/users/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });

    if (!res.ok) {
        console.log(`Failed to fetch user with id: ${id}`);
        return null;
    }

    return res.json();
};