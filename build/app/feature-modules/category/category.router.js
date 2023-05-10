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
const express_1 = require("express");
const response_handler_1 = require("../../utility/response-handler");
const category_service_1 = __importDefault(require("./category.service"));
const category_validator_1 = require("./category.validator");
const router = (0, express_1.Router)();
//ADD NEW CATEGORY
router.post('/', category_validator_1.ADD_CATEGORY_VALIDATOR, (req, res, next) => {
    try {
        const result = category_service_1.default.createCategory(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
});
//GET ALL CATEGORIES
router.get('/', category_validator_1.VIEW_CATEGORY_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield category_service_1.default.ViewAllCategories(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//UPDATE CATEGORY
router.patch('/:id', category_validator_1.UPDATE_CATEGORY_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const result = yield category_service_1.default.updateCategory(categoryId, req.body);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
//DELETE CATEGORY
router.delete('/:id', category_validator_1.DELETE_CATEGORY_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const result = yield category_service_1.default.deleteCategory(categoryId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
