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
Object.defineProperty(exports, "__esModule", { value: true });
const level_schema_1 = require("./level.schema");
const create = (level) => level_schema_1.LevelModel.create(level);
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return level_schema_1.LevelModel.updateOne(filter, update);
});
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    return yield level_schema_1.LevelModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
});
const find = (pipeline) => level_schema_1.LevelModel.aggregate(pipeline);
exports.default = {
    create,
    updateOne,
    findOne,
    find
};
