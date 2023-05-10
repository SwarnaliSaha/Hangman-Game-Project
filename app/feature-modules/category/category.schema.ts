import { ICategory } from "./category.type";
import { BaseSchema } from "../../utility/base-schema";
import { model } from "mongoose";

const CategorySchema = new BaseSchema({
    name:{
        type:String,
        required:true
    }
})
type CategoryDocument = Document & ICategory;
export const CategoryModel = model<CategoryDocument>("Category",CategorySchema);