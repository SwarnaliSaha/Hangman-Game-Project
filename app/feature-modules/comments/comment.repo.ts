import { CommentModel } from "./comment.schema";
import { IComment } from "./comment.type";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (comment:IComment)=>CommentModel.create(comment);

const updateOne = async (filter:FilterQuery<IComment>,update:UpdateQuery<IComment>) => {
    return CommentModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<IComment>) => {
    return await CommentModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => CommentModel.aggregate(pipeline);


export default {
    create,
    updateOne,
    findOne,
    find
}
