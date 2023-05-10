import { NotificationModel } from "./notification.schema";
import { INotification } from "./notification.type";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (notification:INotification)=>NotificationModel.create(notification);

const updateOne = async (filter:FilterQuery<INotification>,update:UpdateQuery<INotification>) => {
    return NotificationModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<INotification>) => {
    return await NotificationModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => NotificationModel.aggregate(pipeline);


export default {
    create,
    updateOne,
    findOne,
    find
}