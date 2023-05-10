import { ObjectId } from "bson";

export interface IWord{
    _id ?:ObjectId,
    word:string,
    category:ObjectId[],
    level:ObjectId
}