"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_VALIDATOR = exports.LOGIN_VALIDATOR = exports.REGISTER_USER_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.REGISTER_USER_VALIDATOR = [
    (0, express_validator_1.body)("userName").notEmpty().isString().isLength({ min: 3 }).withMessage("Provide a valid user name"),
    (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    (0, express_validator_1.body)("password").isString().notEmpty().isLength({ min: 3 }).withMessage("Must contain atleat 3 characters"),
    (0, express_validator_1.body)("role").optional().notEmpty().isArray().withMessage("Role must not be empty and must be an array of strings"),
    (0, express_validator_1.body)("tournamentsPlayed").optional().isArray().isLength({ min: 1 }),
    (0, express_validator_1.body)("tournamentsPlayed.*.tournamentId").notEmpty().isString().withMessage("Provide a valid tournament Id"),
    (0, express_validator_1.body)("tournamentsPlayed.*.timeTaken").notEmpty().isString().withMessage("Provide a valid time"),
    (0, express_validator_1.body)("tournamentsPlayed.*.score").notEmpty().isInt().withMessage("Provide a valid score"),
    (0, express_validator_1.body)("score").optional().notEmpty().isInt().withMessage("Provide a valid score"),
    validate_1.validate
];
exports.LOGIN_VALIDATOR = [
    (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    (0, express_validator_1.body)("password").isString().notEmpty().isLength({ min: 3 }).withMessage("Must contain atleat 3 characters"),
    validate_1.validate
];
exports.REFRESH_TOKEN_VALIDATOR = [
    (0, express_validator_1.body)("refreshToken").isString().notEmpty().withMessage("Please provide the refresh token to get a new access token"),
    validate_1.validate
];
