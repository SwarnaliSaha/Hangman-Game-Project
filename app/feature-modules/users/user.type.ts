import { ObjectId } from "bson";

export interface IUser{
    _id ?:ObjectId,
    userName:string,
    email:string,
    password:string,
    role ?:ObjectId[],
    tournamentsPlayed ?:object[],
    // certificates ?:string[],
    score:number
}