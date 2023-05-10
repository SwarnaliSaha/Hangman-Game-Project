import { ILevel } from "./level.type";
import { BaseSchema } from "../../utility/base-schema";
import { model } from "mongoose";

const LevelSchema = new BaseSchema({
    level:{
        type:String,
        required:true
    }
})

type LevelDocument = Document & ILevel;
export const LevelModel = model<LevelDocument>("Level",LevelSchema);