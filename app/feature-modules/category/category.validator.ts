import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_CATEGORY_VALIDATOR = [
    body("name").notEmpty().isString().withMessage("Provide a valid category name"),

    validate
]

export const UPDATE_CATEGORY_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Category Id"),
    body("name").notEmpty().isString().withMessage("Provide a valid category name"),

    validate
]

export const DELETE_CATEGORY_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Category Id"),

    validate
]

export const VIEW_CATEGORY_VALIDATOR = [
    query("categoryId").optional().notEmpty().isString().withMessage("Provide a valid Category Id"),
    query("sort").optional().isString().withMessage("must be a string"),
    query("page").optional().isString().withMessage("must be a string"),
    query("limit").optional().isString().withMessage("must be a string"),

    validate
]