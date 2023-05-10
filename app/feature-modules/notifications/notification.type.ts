import { ObjectId } from "bson";

export interface INotification{
    _id ?: ObjectId,
    receiverId : ObjectId,
    tournamentId : ObjectId,
    notification : string
}