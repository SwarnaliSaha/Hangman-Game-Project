import { UserModel } from "./user.schema";
import { IUser } from "./user.type";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (user:IUser)=>UserModel.create(user);

const updateOne = async (filter:FilterQuery<IUser>,update:UpdateQuery<IUser>) => {
    return UserModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<IUser>) => {
    return await UserModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => UserModel.aggregate(pipeline);

export default {
    create,
    updateOne,
    findOne,
    find
}