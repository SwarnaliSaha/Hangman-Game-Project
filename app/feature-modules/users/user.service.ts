import { FilterQuery, Types, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { user_responses } from "./user.response";
import { IUser } from "./user.type";
import { Roles } from "../role/role.type";
import { createPipeline } from "../../utility/pipeline";

const createUser = async(user:IUser)=>{
    const record = await userRepo.create(user);

    if(!record) throw user_responses.user_not_created;
    return user_responses.user_created
} 

const updateOne = (filter: FilterQuery<IUser>, update: UpdateQuery<IUser>) => {
    return userRepo.updateOne(filter, update)
}

const updateUser = async(userId:string,updateObject:object)=>{
    const updated = await userRepo.updateOne(
        {_id:new Types.ObjectId(userId)},
        {$set: updateObject}
    )

    if(!updated) throw user_responses.user_not_updated;
    return user_responses.user_updated;
}

const deleteUser = async(userId:string)=>{
    const deleted = await userRepo.updateOne(
        {_id:new Types.ObjectId(userId)},
        {$set : {
            isDeleted : true
        }}
    )

    if(!deleted) throw user_responses.user_not_deleted;
    return user_responses.user_deleted;
}

const findUser = async(filter:Partial<IUser>) => {
    const foundUser = await userRepo.findOne(filter);

    if(!foundUser) throw user_responses.user_not_found;
    return foundUser;
}

const ViewAllUsers = async(query:any)=>{
    const pipeline = createPipeline(query);

    const result = await userRepo.find(pipeline);

    return result;
}

//ADMIN CAN PROVIDE ANY PAYER THE MODERATOR ACCESS
const mderatorAccess = async(userId : string) => {
    const user = await findUser({_id:new Types.ObjectId(userId)});

    const findIndex = user.role?.findIndex(ele => ele.toString() === Roles.moderator.toString());

    if(findIndex == -1){
        const updateUser = await userRepo.updateOne(
            {_id : new Types.ObjectId(userId)},
            {$push : {
                role : 
                    Roles.moderator
                }
            }
        )
        return user_responses.moderator_access_given;
    }
    
    return user_responses.moderator_access_not_given;
}

export default {
    createUser,
    updateUser,
    deleteUser,
    findUser,
    ViewAllUsers,
    mderatorAccess,
    updateOne
}