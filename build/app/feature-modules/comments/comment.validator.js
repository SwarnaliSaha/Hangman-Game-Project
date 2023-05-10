"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLAG_COMMENT_VALIDATOR = exports.DELETE_COMMENT_VALIDATOR = exports.VIEW_ALL_COMMENTS = exports.POST_REPLY_VALIDATOR = exports.ADD_COMMENT_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_COMMENT_VALIDATOR = [
    (0, express_validator_1.body)("senderId").notEmpty().isString().withMessage("Must provide a valid sender Id"),
    (0, express_validator_1.body)("receiverId").notEmpty().isString().withMessage("Must provide a valid receiver Id"),
    (0, express_validator_1.body)("tournamentId").notEmpty().isString().withMessage("Must provide a valid tournament Id"),
    (0, express_validator_1.body)("comment").notEmpty().isString().withMessage("Must provide a valid comment"),
    validate_1.validate
];
exports.POST_REPLY_VALIDATOR = [
    (0, express_validator_1.body)("commentId").notEmpty().isString().withMessage("Must provide a valid comment Id"),
    (0, express_validator_1.body)("reply.senderId").notEmpty().isString().withMessage("Must provide a valid sender Id"),
    (0, express_validator_1.body)("reply.reply").notEmpty().isString().withMessage("Must provide a valid reply"),
    validate_1.validate
];
exports.VIEW_ALL_COMMENTS = [
    (0, express_validator_1.query)("commentId").optional().notEmpty().isString().withMessage("Must provide a valid comment Id"),
    (0, express_validator_1.query)("senderId").optional().notEmpty().isString().withMessage("Must provide a valid sender Id"),
    (0, express_validator_1.body)("receiverId").optional().notEmpty().isString().withMessage("Must provide a valid receiver Id"),
    (0, express_validator_1.query)("sort").optional().isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional().isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional().isString().withMessage("must be a string"),
    validate_1.validate
];
exports.DELETE_COMMENT_VALIDATOR = [
    (0, express_validator_1.param)("id").notEmpty().isString().withMessage("Provide a valid Comment Id"),
    validate_1.validate
];
exports.FLAG_COMMENT_VALIDATOR = [
    (0, express_validator_1.param)("id").notEmpty().isString().withMessage("Provide a valid Comment or Reply Id"),
    validate_1.validate
];
//body("replies").optional().isArray().isLength({min:1}).withMessage("Replies should be a valid array"),
