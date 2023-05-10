"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_repo_1 = __importDefault(require("./word.repo"));
const word_response_1 = require("./word.response");
const mongoose_1 = require("mongoose");
const pipeline_1 = require("../../utility/pipeline");
const createWord = (word) => {
    const record = word_repo_1.default.create(word);
    if (!record)
        throw word_response_1.word_responses.word_not_added;
    return word_response_1.word_responses.word_added;
};
const ViewAllWords = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.createPipeline)(query);
    const result = yield word_repo_1.default.find(pipeline);
    return result;
});
const updateWord = (wordId, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield word_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(wordId) }, { $set: updateObject });
    if (!updated)
        throw word_response_1.word_responses.word_not_updated;
    return word_response_1.word_responses.word_updated;
});
const deleteWord = (wordId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield word_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(wordId) }, { $set: {
            isDeleted: true
        } });
    if (!deleted)
        throw word_response_1.word_responses.word_not_deleted;
    return word_response_1.word_responses.word_deleted;
});
const findWord = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const foundWord = yield word_repo_1.default.findOne(filter);
    if (!foundWord)
        throw word_response_1.word_responses.word_not_found;
    return foundWord;
});
exports.default = {
    createWord,
    ViewAllWords,
    updateWord,
    deleteWord,
    findWord
};
