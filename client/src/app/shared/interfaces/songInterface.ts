import { IUser } from "./userInterface";

export interface ISong {
    name: string,
    author: string,
    genre: string,
    year: number,
    description: string,
    songImage: string,
    _id: string,
    owner: IUser,
    addedBy: IUser[]
}