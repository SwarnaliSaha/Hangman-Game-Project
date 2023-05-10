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
const comment_service_1 = __importDefault(require("./comment.service"));
const comment_validator_1 = require("./comment.validator");
const router = (0, express_1.Router)();
//POST A NEW COMMENT
router.post('/', comment_validator_1.ADD_COMMENT_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comment_service_1.default.createComment(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//POST REPLY TO A COMMENT
router.post('/reply', comment_validator_1.POST_REPLY_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.body.commentId;
        const result = yield comment_service_1.default.createReply(commentId, req.body.reply);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//VIEW ALL COMMENTS
router.get('/', comment_validator_1.VIEW_ALL_COMMENTS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield comment_service_1.default.ViewAllComments(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//DELETE COMMENT BY MODERATOR
router.delete('/:id', comment_validator_1.DELETE_COMMENT_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const result = yield comment_service_1.default.deleteComment(commentId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//UPDATE A COMMENT
//FLAG COMMENT BY MODERATOR
router.patch('/:id', comment_validator_1.FLAG_COMMENT_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const reason = req.body.reason;
        const result = yield comment_service_1.default.flagComment(commentId, reason);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
