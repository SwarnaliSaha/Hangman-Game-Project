import { IWord } from "./word.type";
import wordRepo from "./word.repo";
import { word_responses } from "./word.response";
import { Types } from "mongoose";
import { createPipeline } from "../../utility/pipeline";

const createWord = (word:IWord)=>{
    const record = wordRepo.create(word);

    if(!record) throw word_responses.word_not_added;
    return word_responses.word_added;
} 

const ViewAllWords = async(query:any)=>{
    const pipeline = createPipeline(query);

    const result = await wordRepo.find(pipeline);

    return result;
}

const updateWord = async(wordId:string,updateObject:object)=>{
    const updated = await wordRepo.updateOne(
        {_id:new Types.ObjectId(wordId)},
        {$set: updateObject}
    )

    if(!updated) throw word_responses.word_not_updated;
    return word_responses.word_updated;
}

const deleteWord = async(wordId:string)=>{
    const deleted = await wordRepo.updateOne(
        {_id:new Types.ObjectId(wordId)},
        {$set : {
            isDeleted : true
        }}
    )

    if(!deleted) throw word_responses.word_not_deleted;
    return word_responses.word_deleted;
}

const findWord = async(filter:Partial<IWord>) => {
    const foundWord = await wordRepo.findOne(filter);

    if(!foundWord) throw word_responses.word_not_found;
    return foundWord;
}
export default {
    createWord,
    ViewAllWords,
    updateWord,
    deleteWord,
    findWord
}
