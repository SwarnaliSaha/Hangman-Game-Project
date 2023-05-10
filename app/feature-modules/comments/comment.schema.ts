import { IComment } from "./comment.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const CommentSchema = new BaseSchema({
    senderId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    receiverId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    tournamentId : {
        type : Schema.Types.ObjectId,
        ref : 'Tournament',
        required : true
    },
    comment:{
        type:String,
        required:true
    },
    replies : [
        {
            senderId : {
                type : Schema.Types.ObjectId,
                ref : "User"
            },
            reply : String,
            flagReply : {
                type : Boolean,
                default : false
            },
            reason : String,
            isDeleted : {
                type : Boolean,
                default : false
            }
        }
    ],
    isFlagged : {
        type:Boolean,
        default : false
    },
    reason : {
        type : String,
        default : ""
    }
})

type CommentDocument = Document & IComment;
export const CommentModel = model<CommentDocument>("Comment",CommentSchema); 