import { IWord } from "./word.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const WordSchema = new BaseSchema({
    word:{
        type:String,
        required:true
    },
    category: {
        type:[Schema.Types.ObjectId],
        ref:'Category',
        required:true
    },
    level: {
        type:Schema.Types.ObjectId,
        ref:'Level',
        required:true
    }
})

type WordDocument = Document & IWord;
export const WordModel = model<WordDocument>("Word",WordSchema);