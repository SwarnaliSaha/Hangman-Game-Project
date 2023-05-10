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
const level_repo_1 = __importDefault(require("./level.repo"));
const level_response_1 = require("./level.response");
const mongoose_1 = require("mongoose");
const pipeline_1 = require("../../utility/pipeline");
const createLevel = (level) => {
    const record = level_repo_1.default.create(level);
    if (!record)
        throw level_response_1.level_responses.level_not_added;
    return level_response_1.level_responses.level_added;
};
const updateLevel = (levelId, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield level_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(levelId) }, { $set: updateObject });
    if (!updated)
        throw level_response_1.level_responses.level_not_updated;
    return level_response_1.level_responses.level_updated;
});
const deleteLevel = (levelId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield level_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(levelId) }, { $set: {
            isDeleted: true
        } });
    if (!deleted)
        throw level_response_1.level_responses.level_not_deleted;
    return level_response_1.level_responses.level_deleted;
});
const ViewAllLevels = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.createPipeline)(query);
    const result = yield level_repo_1.default.find(pipeline);
    return result;
});
exports.default = {
    createLevel,
    updateLevel,
    deleteLevel,
    ViewAllLevels
};
