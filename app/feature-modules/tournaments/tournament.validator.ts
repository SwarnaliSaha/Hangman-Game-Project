import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const CREATE_TOURNAMENT_VALIDATOR = [
    body("tournamentName").notEmpty().isString().withMessage("Must provide a valid tournament name"),
    body("creatorId").notEmpty().isString().withMessage("Must provide a valid creator id"),
    body("category").notEmpty().isArray().isLength({min:1}).withMessage("Category is required"),
    body("category.*").isString().withMessage("Category must be a valid string"),
    body("level").notEmpty().isString().withMessage("Must provide a level"),
    body("words").notEmpty().isArray().isLength({min:1}).withMessage("Category is required"),
    body("words.*").isString().withMessage("Category must be a valid string"),

    validate
]

export const DELETE_TOURNAMENT_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Tournament Id"),

    validate
]

export const VERIFY_TOURNAMENT_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Tournament Id"),
    body("status").notEmpty().isString().withMessage("Provide a valid status"),

    validate
]

export const PLAY_TOURNAMENT_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Tournament Id"),
    body("playerId").notEmpty().isString().withMessage("Provide a valid Player Id"),
    body("mistakes").notEmpty().isInt().withMessage("Provide valid number"),
    body("time").notEmpty().isString().withMessage("Provide a valid time"),

    validate
]

export const UPDATE_TOURNAMENT_NONARRAY_VALIDATOR = [
    param("id").notEmpty().isString().withMessage("Provide a valid Tournament Id"),
    body("tournamentName").notEmpty().isString().withMessage("Provide a valid Tournament Name"),
    body("level").notEmpty().isString().withMessage("Provide a valid Tournament Name"),

    validate
]