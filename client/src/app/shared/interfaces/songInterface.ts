import { IUser } from "./userInterface";

export interface ISong {
    name: string,
    author: string,
    genre: string,
    year: number,
    description: string,
    songImage: string,
    price: number,
    _id: string,
    owner: IUser,
    addedBy: IUser[]
}