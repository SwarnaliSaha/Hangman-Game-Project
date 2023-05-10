import { LevelModel } from "./level.schema";
import { ILevel } from "./level.type";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (level:ILevel)=>LevelModel.create(level);

const updateOne = async (filter:FilterQuery<ILevel>,update:UpdateQuery<ILevel>) => {
    return LevelModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<ILevel>) => {
    return await LevelModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => LevelModel.aggregate(pipeline);

export default {
    create,
    updateOne,
    findOne,
    find
};