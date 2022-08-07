import {ISuperhero} from "./ISuperhero";

export interface IUser {

    id: number;
    email: string;
    username: string;
    password: string;
    created_superheros: ISuperhero[];
    favorite_superheros: ISuperhero[];
    token: string;

}