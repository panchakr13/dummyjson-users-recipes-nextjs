import {Address} from "@/models/userModel/IUserAddress";


export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}