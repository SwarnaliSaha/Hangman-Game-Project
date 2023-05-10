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
const tournament_service_1 = __importDefault(require("./tournament.service"));
const router = (0, express_1.Router)();
//CREATOR CREATES A TOURNAMENT
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tournament_service_1.default.createTournament(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
//VIEW ALL TOURNAMENTS
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield tournament_service_1.default.ViewAllTournaments(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//CREATOR CAN DELETE A TOURNAMENT
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentId = req.params.id;
        const result = yield tournament_service_1.default.deleteTournament(tournamentId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN APPROVE OR REJECT OR SEND OUT COMMENT ON ANY TOURNAMENT
router.patch('/verification/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentId = req.params.id;
        const result = yield tournament_service_1.default.adminApproval(tournamentId, req.body.status);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//PLAY A TOURNAMNET
router.patch('/play/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentId = req.params.id;
        const { playerId, mistakes, time } = req.body;
        const result = yield tournament_service_1.default.playTournament(tournamentId, playerId, mistakes, time);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//CREATOR CAN UPDATE HIS TOURNAMENT (FOR NON-ARRAY FIELDS)
router.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentId = req.params.id;
        const result = yield tournament_service_1.default.updateTournament(tournamentId, req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//CREATOR CAN UPDATE HIS TOURNAMENT (FOR ARRAYS - WORDS AND CATEGORIES)
router.patch('/updateWordsOrCategory/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentId = req.params.id;
        const { wordId, categoryId, action } = req.body;
        const result = yield tournament_service_1.default.updateTournamentArrays(tournamentId, wordId, categoryId, action);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
