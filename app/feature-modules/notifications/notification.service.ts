import { Types } from "mongoose";
import { createPipeline } from "../../utility/pipeline";
import notificationRepo from "./notification.repo";
import { INotification } from "./notification.type";

//CREATE NOTIFICATION
const createNotification = async(comment:INotification)=>{
    const record = await notificationRepo.create(comment);

    return record;
} 

//FIND A NOTIFICATION
// const findComment = async(filter:Partial<INotification>) => {
//     const foundcomment = await notificationRepo.findOne(filter);

//     if(!foundcomment) throw comment_responses.comment_not_found;
//     return foundcomment;
// }

//VIEW ALL NOTIFICATIONS

const ViewAllNotifications = async(query:any)=>{
    const {receiverId,...filters} = query;

    const pipeline = createPipeline(filters);

    const aggregate = [];

    if(receiverId){
        aggregate.push({
            $match : {
                receiverId : new Types.ObjectId(receiverId)
            }
        })
    }

    aggregate.push(...pipeline)

    const result = await notificationRepo.find(aggregate);

    return result;
}

export default {
    createNotification,
    ViewAllNotifications
}