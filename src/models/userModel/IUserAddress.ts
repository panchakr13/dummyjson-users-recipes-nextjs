import {Coordinates} from "@/models/userModel/IUserCoordinates";

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}