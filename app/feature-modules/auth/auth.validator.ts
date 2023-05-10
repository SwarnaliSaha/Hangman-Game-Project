import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const REGISTER_USER_VALIDATOR = [
    body("userName").notEmpty().isString().isLength({min:3}).withMessage("Provide a valid user name"),
    body("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    body("password").isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    body("role").optional().notEmpty().isArray().withMessage("Role must not be empty and must be an array of strings"),
    body("tournamentsPlayed").optional().isArray().isLength({min:1}),
    body("tournamentsPlayed.*.tournamentId").notEmpty().isString().withMessage("Provide a valid tournament Id"),
    body("tournamentsPlayed.*.timeTaken").notEmpty().isString().withMessage("Provide a valid time"),
    body("tournamentsPlayed.*.score").notEmpty().isInt().withMessage("Provide a valid score"),
    body("score").optional().notEmpty().isInt().withMessage("Provide a valid score"),

    validate
]

export const LOGIN_VALIDATOR = [
    body("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    body("password").isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    validate
]

export const REFRESH_TOKEN_VALIDATOR = [
    body("refreshToken").isString().notEmpty().withMessage("Please provide the refresh token to get a new access token"),

    validate
]