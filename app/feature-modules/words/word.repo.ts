import { IWord } from "./word.type";
import { WordModel } from "./word.schema";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (word:IWord)=>WordModel.create(word);

const updateOne = async (filter:FilterQuery<IWord>,update:UpdateQuery<IWord>) => {
    return WordModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<IWord>) => {
    return await WordModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => WordModel.aggregate(pipeline);

export default {
    create,
    updateOne,
    findOne,
    find
};