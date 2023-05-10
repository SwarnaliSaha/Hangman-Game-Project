import { IUser } from "./user.type";
import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base-schema";

const UserSchema = new BaseSchema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:[Schema.Types.ObjectId],
        ref:'Role',
        required:true,
    },
    tournamentsPlayed : [
        {
            tournamentId : {
                type : Schema.Types.ObjectId,
                ref : 'Tournamnet'
            },
            timeTaken : {
                type : String
            },
            score : {
                type : Number
            }
        }
    ],
    score:{
        type:Number,
        default:0
    },
})

type UserDocument = Document & IUser;
export const UserModel = model<UserDocument>("User",UserSchema); 