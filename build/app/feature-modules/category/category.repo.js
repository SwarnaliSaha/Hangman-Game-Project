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
const category_schema_1 = require("./category.schema");
const create = (category) => category_schema_1.CategoryModel.create(category);
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return category_schema_1.CategoryModel.updateOne(filter, update);
});
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_schema_1.CategoryModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
});
const find = (pipeline) => category_schema_1.CategoryModel.aggregate(pipeline);
exports.default = {
    create,
    updateOne,
    findOne,
    find
};
