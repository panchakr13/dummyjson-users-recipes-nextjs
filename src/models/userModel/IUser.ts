import {Hair} from "@/models/userModel/IUserHair";
import {Address} from "node:cluster";
import {Bank} from "@/models/userModel/IUserBank";
import {Company} from "@/models/userModel/IUserCompany";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}