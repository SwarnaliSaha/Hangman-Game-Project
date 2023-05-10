import levelRepo from "./level.repo";
import { ILevel } from "./level.type";
import { level_responses } from "./level.response";
import { Types } from "mongoose";
import { createPipeline } from "../../utility/pipeline";

const createLevel = (level:ILevel)=>{
    const record = levelRepo.create(level);

    if(!record) throw level_responses.level_not_added;
    return level_responses.level_added;
} 

const updateLevel = async(levelId:string,updateObject:object)=>{
    const updated = await levelRepo.updateOne(
        {_id:new Types.ObjectId(levelId)},
        {$set: updateObject}
    )

    if(!updated) throw level_responses.level_not_updated;
    return level_responses.level_updated;
}

const deleteLevel = async(levelId:string)=>{
    const deleted = await levelRepo.updateOne(
        {_id:new Types.ObjectId(levelId)},
        {$set : {
            isDeleted : true
        }}
    )

    if(!deleted) throw level_responses.level_not_deleted;
    return level_responses.level_deleted;
}

const ViewAllLevels = async(query:any)=>{
    const {levelId,...filters} = query;
    const pipeline = createPipeline(filters);

    const aggregate = [];

    if(levelId){
        aggregate.push({
            $match : {
                _id : new Types.ObjectId(levelId)
            }
        })
    }

    aggregate.push(...pipeline)

    const result = await levelRepo.find(aggregate);

    return result;
}

export default {
    createLevel,
    updateLevel,
    deleteLevel,
    ViewAllLevels
}
