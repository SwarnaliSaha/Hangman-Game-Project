import { INotification } from "./notification.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const NotificationSchema = new BaseSchema({
    receiverId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    tournamentId : {
        type : Schema.Types.ObjectId,
        ref : 'Tournament',
        required : true
    },
    notification:{
        type:String,
        required:true
    }
})

type NotificationDocument = Document & INotification;
export const NotificationModel = model<NotificationDocument>("Notification",NotificationSchema); 