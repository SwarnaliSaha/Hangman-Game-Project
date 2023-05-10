"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_CATEGORY_VALIDATOR = exports.DELETE_CATEGORY_VALIDATOR = exports.UPDATE_CATEGORY_VALIDATOR = exports.ADD_CATEGORY_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_CATEGORY_VALIDATOR = [
    (0, express_validator_1.body)("name").notEmpty().isString().withMessage("Provide a valid category name"),
    validate_1.validate
];
exports.UPDATE_CATEGORY_VALIDATOR = [
    (0, express_validator_1.param)("id").notEmpty().isString().withMessage("Provide a valid Category Id"),
    (0, express_validator_1.body)("name").notEmpty().isString().withMessage("Provide a valid category name"),
    validate_1.validate
];
exports.DELETE_CATEGORY_VALIDATOR = [
    (0, express_validator_1.param)("id").notEmpty().isString().withMessage("Provide a valid Category Id"),
    validate_1.validate
];
exports.VIEW_CATEGORY_VALIDATOR = [
    (0, express_validator_1.query)("categoryId").optional().notEmpty().isString().withMessage("Provide a valid Category Id"),
    (0, express_validator_1.query)("sort").optional().isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional().isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional().isString().withMessage("must be a string"),
    validate_1.validate
];
