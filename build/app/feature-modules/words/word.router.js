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
const word_service_1 = __importDefault(require("./word.service"));
const express_1 = require("express");
const response_handler_1 = require("../../utility/response-handler");
const router = (0, express_1.Router)();
//CREATE NEW WORD
router.post('/', (req, res, next) => {
    try {
        const result = word_service_1.default.createWord(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
});
//VIEW ALL WORDS
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield word_service_1.default.ViewAllWords(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//UPDATE WORD
router.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wordId = req.params.id;
        const result = yield word_service_1.default.updateWord(wordId, req.body);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
//DELETE WORD
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wordId = req.params.id;
        const result = yield word_service_1.default.deleteWord(wordId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
