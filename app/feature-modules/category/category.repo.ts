import { ICategory } from "./category.type";
import { CategoryModel } from "./category.schema";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (category:ICategory)=>CategoryModel.create(category);

const updateOne = async (filter:FilterQuery<ICategory>,update:UpdateQuery<ICategory>) => {
    return CategoryModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<ICategory>) => {
    return await CategoryModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => CategoryModel.aggregate(pipeline);

export default {
    create,
    updateOne,
    findOne,
    find
};