import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_LEVEL_VALIDATION = [
    body("level").notEmpty().isString().withMessage("Provide a valid level name"),

    validate
]

export const UPDATE_LEVEL_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Level Id"),
    body("level").notEmpty().isString().withMessage("Provide a valid level name"),

    validate
]

export const DELETE_LEVEL_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Level Id"),

    validate
]

export const VIEW_ALL_LEVELS_VALIDATOR = [
    query("levelId").optional().notEmpty().isString().withMessage("Provide a valid Level Id"),
    query("sort").optional().isString().withMessage("must be a string"),
    query("page").optional().isString().withMessage("must be a string"),
    query("limit").optional().isString().withMessage("must be a string"),

    validate
]