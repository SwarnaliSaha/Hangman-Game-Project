import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_COMMENT_VALIDATOR = [
    body("senderId").notEmpty().isString().withMessage("Must provide a valid sender Id"),
    body("receiverId").notEmpty().isString().withMessage("Must provide a valid receiver Id"),
    body("tournamentId").notEmpty().isString().withMessage("Must provide a valid tournament Id"),
    body("comment").notEmpty().isString().withMessage("Must provide a valid comment"),

    validate
]

export const POST_REPLY_VALIDATOR = [
    body("commentId").notEmpty().isString().withMessage("Must provide a valid comment Id"),
    body("reply.senderId").notEmpty().isString().withMessage("Must provide a valid sender Id"),
    body("reply.reply").notEmpty().isString().withMessage("Must provide a valid reply"),
    
    validate
]

export const VIEW_ALL_COMMENTS = [
    query("commentId").optional().notEmpty().isString().withMessage("Must provide a valid comment Id"),
    query("senderId").optional().notEmpty().isString().withMessage("Must provide a valid sender Id"),
    body("receiverId").optional().notEmpty().isString().withMessage("Must provide a valid receiver Id"),
    query("sort").optional().isString().withMessage("must be a string"),
    query("page").optional().isString().withMessage("must be a string"),
    query("limit").optional().isString().withMessage("must be a string"),

    validate

]

export const DELETE_COMMENT_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Comment Id"),

    validate
]

export const FLAG_COMMENT_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Comment or Reply Id"),

    validate
]