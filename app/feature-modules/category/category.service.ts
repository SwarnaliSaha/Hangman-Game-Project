import { Types } from "mongoose";
import categoryRepo from "./category.repo";
import { ICategory } from "./category.type";
import { CATEGORY_RESPONSES } from "./category.response";
import { createPipeline } from "../../utility/pipeline";

const createCategory = (category:ICategory)=>{
    const record = categoryRepo.create(category);

    if(!record) throw CATEGORY_RESPONSES.CATEGORY_NOT_ADDED;
    return CATEGORY_RESPONSES.CATEGORY_ADDED;
} 

const updateCategory = async(categoryId:string,updateObject:object)=>{
    const updated = await categoryRepo.updateOne(
        {_id:new Types.ObjectId(categoryId)},
        {$set: updateObject}
    )

    if(!updated) throw CATEGORY_RESPONSES.CATEGORY_NOT_UPDATED
    return CATEGORY_RESPONSES.CATEGORY_UPDATED;
}

const deleteCategory = async(categoryId:string)=>{
    const deleted = await categoryRepo.updateOne(
        {_id:new Types.ObjectId(categoryId)},
        {$set : {
            isDeleted : true
        }}
    )

    if(!deleted) throw CATEGORY_RESPONSES.CATEGORY_NOT_DELETED;
    return CATEGORY_RESPONSES.CATEGORY_DELETED;
}

const ViewAllCategories = async(query:any)=>{
    const {categoryId,...filter} = query;

    const pipeline = createPipeline(filter);

    const aggregate = [];

    if(categoryId){
        aggregate.push({
            $match : {
                _id : new Types.ObjectId(categoryId)
            }
        })
    }

    aggregate.push(...pipeline)

    const result = await categoryRepo.find(aggregate);

    return result;
}

const findCategory = async(filter:Partial<ICategory>) => {
    const foundCategory = await categoryRepo.findOne(filter);

    if(!foundCategory) throw CATEGORY_RESPONSES.CATEGORY_NOT_FOUND;
    return foundCategory;
}

export default {
    createCategory,
    updateCategory,
    deleteCategory,
    ViewAllCategories,
    findCategory
}
