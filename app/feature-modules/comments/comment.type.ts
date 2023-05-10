import { ObjectId } from "bson";

export interface IComment{
    _id :ObjectId,
    senderId : ObjectId,
    receiverId : ObjectId,
    tournamentId : string,
    comment : string,
    replies ?: [object],
    isFlagged ?: boolean,
    reason ?: string
}