import {IUser} from "./IUser";

export interface ISuperhero{

    id: number;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images: File[];
    images_array: string[];
    main_image: string;
    author_id: number;
    followers: IUser[];
    createdAt: string;
    images_string: string;

}