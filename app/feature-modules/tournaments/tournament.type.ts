import { ObjectId } from "bson";

export interface ITournament{
    _id ?:string,
    tournamentName : string,
    creatorId : ObjectId,
    category : ObjectId[],
    level : ObjectId,
    words : ObjectId[],
    adminApproval : string,
    ongoing : boolean,
}