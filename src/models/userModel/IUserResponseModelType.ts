import {IUser} from "@/models/userModel/IUser";

export interface IUsersResponseModelType {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}
