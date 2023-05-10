import { ITournament } from "./tournament.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const TournamentSchema = new BaseSchema({
    tournamentName:{
        type:String,
        required:true
    },
    creatorId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    category : {
        type : [Schema.Types.ObjectId],
        ref : 'Category',
        required: true
    },
    level : {
        type : Schema.Types.ObjectId,
        ref : 'Level',
        required: true
    },
    words: {
        type:[Schema.Types.ObjectId],
        ref:'Word',
        required:true
    },
    adminApproval : {
        type : String,
        default : "pending"
    },
    ongoing : {
        type : Boolean,
        default : false
    }
})

type TournamentDocument = Document & ITournament;
export const TournamentModel = model<TournamentDocument>("Tournament",TournamentSchema); 