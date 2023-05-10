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
const tournament_repo_1 = __importDefault(require("./tournament.repo"));
const tournament_response_1 = require("./tournament.response");
const mongoose_1 = require("mongoose");
const pipeline_1 = require("../../utility/pipeline");
const notification_service_1 = __importDefault(require("../notifications/notification.service"));
const user_service_1 = __importDefault(require("../users/user.service"));
const word_service_1 = __importDefault(require("../words/word.service"));
const category_service_1 = __importDefault(require("../category/category.service"));
const updateOne = (filter, update) => {
    return tournament_repo_1.default.updateOne(filter, update);
};
//CREATE A NEW TOURNAMENT
const createTournament = (tournament) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield tournament_repo_1.default.create(tournament);
    if (!record)
        throw tournament_response_1.tournament_responses.tournament_not_created;
    return tournament_response_1.tournament_responses.tournament_created;
});
//FIND A TOURNAMENT
const findTournament = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const foundTournament = yield tournament_repo_1.default.findOne(filter);
    if (!foundTournament)
        throw tournament_response_1.tournament_responses.tournament_not_found;
    return foundTournament;
});
//VIEW THE LIST OF ALL TOURNAMENTS
const ViewAllTournaments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.createPipeline)(query);
    const result = yield tournament_repo_1.default.find(pipeline);
    return result;
});
//UPDATE TOURNAMENT WITHOUT THE ARRAYS
const updateTournament = (tournamentId, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield tournament_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(tournamentId) }, { $set: updateObject });
    if (!updated)
        throw tournament_response_1.tournament_responses.tournament_not_updated;
    return tournament_response_1.tournament_responses.tournament_updated;
});
//UPDATE CATEGORY AND WORDS ARRAY
const updateTournamentArrays = (tournamentId, wordId = "", categoryId = "", action) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findTournament({ _id: tournamentId });
    if (action == "addWords" && wordId !== "") {
        const wordFromGlobalDb = yield word_service_1.default.findWord({ _id: new mongoose_1.Types.ObjectId(wordId) });
        const updateTournament = yield tournament_repo_1.default.updateOne({ _id: tournamentId }, { $push: {
                words: wordId
            } });
    }
    if (action == "deleteWord" && wordId !== "") {
        const updateTournament = yield tournament_repo_1.default.updateOne({ _id: tournamentId }, { $pull: {
                words: wordId
            } });
    }
    if (action == "addCategory" && categoryId !== "") {
        const categoryFromDb = yield category_service_1.default.findCategory({ _id: categoryId });
        const updateTournament = yield tournament_repo_1.default.updateOne({ _id: categoryId }, { $push: {
                category: categoryId
            } });
    }
    if (action == "deleteCategory" && categoryId !== "") {
        const tournament = yield findTournament({ _id: tournamentId });
        yield tournament_repo_1.default.updateOne({ _id: tournamentId }, { $pull: {
                category: categoryId
            } });
        for (let word of tournament.words) {
            let wordFromDb = yield word_service_1.default.findWord({ _id: word });
            let category = wordFromDb.category;
            if (category.length > 1) {
                for (let ele of category) {
                    let findIndex = tournament.category.findIndex(item => item.toString() == ele.toString());
                    if (findIndex == -1) {
                        yield tournament_repo_1.default.updateOne({ _id: tournamentId }, { $pull: {
                                words: word
                            } });
                    }
                }
            }
            if (category.length == 1) {
                if (category[0].toString() === categoryId.toString()) {
                    yield tournament_repo_1.default.updateOne({ _id: tournamentId }, { $pull: {
                            words: word
                        } });
                }
            }
        }
    }
    return tournament_response_1.tournament_responses.tournament_updated;
});
//DELETE A TOURNAMENT
const deleteTournament = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findTournament({ _id: tournamentId });
    if (tournament.adminApproval === "pending") {
        const deleted = yield tournament_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(tournamentId) }, { $set: {
                isDeleted: true
            } });
        return tournament_response_1.tournament_responses.tournament_deleted;
    }
    throw tournament_response_1.tournament_responses.tournament_not_deleted;
});
//ADMIN APPROVAL FOR A TOURNAMENT
const adminApproval = (tournamentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === "verified") {
        const updatedTournament = yield updateTournament(tournamentId, {
            adminApproval: status,
            ongoing: true
        });
        let tournament = yield findTournament({ _id: tournamentId });
        let creatorId = tournament.creatorId;
        const notification = yield notification_service_1.default.createNotification({
            receiverId: creatorId,
            tournamentId: new mongoose_1.Types.ObjectId(tournamentId),
            notification: "Admin has approved your tournment"
        });
        return notification;
    }
    if (status === "rejected") {
        const updatedTournament = yield updateTournament(tournamentId, { adminApproval: status });
        let tournament = yield findTournament({ _id: tournamentId });
        let creatorId = tournament.creatorId;
        const notification = yield notification_service_1.default.createNotification({
            receiverId: creatorId,
            tournamentId: new mongoose_1.Types.ObjectId(tournamentId),
            notification: "Admin has rejected your tournment"
        });
        return notification;
    }
});
//PLAY ANY TOURNAMENT
const playTournament = (tournamentId, playerId, mistakes, time) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findTournament({ _id: tournamentId });
    if (tournament.adminApproval == "verified" && tournament.ongoing == true) {
        const totalWords = tournament.words.length;
        const total = (totalWords * 10);
        const score = (total - (mistakes * 10));
        const updateUser = yield user_service_1.default.updateOne({ _id: playerId }, {
            $push: {
                tournamentsPlayed: {
                    tournamentId: tournamentId,
                    timeTaken: time,
                    score: score
                }
            },
            $inc: {
                score: score
            }
        });
        return updateUser;
    }
    throw tournament_response_1.tournament_responses.cannot_play;
});
//CREATOR CLOSES HIS TOURNAMENT
// const closeTournament = async(tournamentId : string)=>{
//     const tournament = await findTournament({_id : tournamentId});
//     await updateTournament(tournamentId,{ongoing : false});
//     const browser = puppeteer.launch();
// }
exports.default = {
    updateOne,
    createTournament,
    ViewAllTournaments,
    updateTournament,
    deleteTournament,
    findTournament,
    adminApproval,
    playTournament,
    updateTournamentArrays
};
