import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const VIEW_NOTIFICATION_VALIDATOR = [
    query("receiverId").optional().notEmpty().isString().withMessage("Must provide a valid receiver Id"),
    query("sort").optional().isString().withMessage("must be a string"),
    query("page").optional().isString().withMessage("must be a string"),
    query("limit").optional().isString().withMessage("must be a string"),

    validate
]