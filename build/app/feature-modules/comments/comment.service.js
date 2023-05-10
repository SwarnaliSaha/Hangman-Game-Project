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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_repo_1 = __importDefault(require("./comment.repo"));
const comment_response_1 = require("./comment.response");
const mongoose_1 = require("mongoose");
const tournament_service_1 = __importDefault(require("../tournaments/tournament.service"));
const pipeline_1 = require("../../utility/pipeline");
const notification_service_1 = __importDefault(require("../notifications/notification.service"));
//CREATE NEW COMMENT
const createComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    let tournament = yield tournament_service_1.default.findTournament({ _id: comment.tournamentId });
    const record = yield comment_repo_1.default.create(comment);
    if (!record)
        throw comment_response_1.comment_responses.comment_not_added;
    const notification = yield notification_service_1.default.createNotification({
        receiverId: comment.receiverId,
        tournamentId: new mongoose_1.Types.ObjectId(comment.tournamentId),
        notification: "You have a new comment"
    });
    return notification;
});
//FIND A COMMENT
const findComment = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const foundcomment = yield comment_repo_1.default.findOne(filter);
    if (!foundcomment)
        throw comment_response_1.comment_responses.comment_not_found;
    return foundcomment;
});
//VIEW ALL COMMENTS
const ViewAllComments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId, tournamentId } = query, filters = __rest(query, ["senderId", "receiverId", "tournamentId"]);
    const pipeline = (0, pipeline_1.createPipeline)(filters);
    const aggregate = [];
    if (senderId) {
        aggregate.push({
            $match: {
                senderId: new mongoose_1.Types.ObjectId(senderId)
            }
        });
    }
    if (receiverId) {
        aggregate.push({
            $match: {
                senderId: new mongoose_1.Types.ObjectId(receiverId)
            }
        });
    }
    if (tournamentId) {
        aggregate.push({
            $match: {
                tournamentId: new mongoose_1.Types.ObjectId(tournamentId)
            }
        });
    }
    aggregate.push(...pipeline);
    const result = yield comment_repo_1.default.find(aggregate);
    return result;
});
//UPDATE A COMMENT
const updateComment = (commentId, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield comment_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(commentId) }, { $set: updateObject });
    if (!updated)
        throw comment_response_1.comment_responses.comment_not_updated;
    return comment_response_1.comment_responses.comment_updated;
});
//DELETE A COMMENT
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield comment_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(commentId) }, { $set: {
            isDeleted: true
        } });
    if (!deleted)
        throw comment_response_1.comment_responses.comment_not_deleted;
    return comment_response_1.comment_responses.comment_deleted;
});
//CREATE REPLY
const createReply = (commentId, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield findComment({ _id: new mongoose_1.Types.ObjectId(commentId) });
    const replyAdded = yield comment_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(commentId) }, { $push: {
            replies: reply
        } });
    if (!replyAdded)
        throw comment_response_1.comment_responses.reply_not_added;
    const notification = yield notification_service_1.default.createNotification({
        receiverId: comment.receiverId,
        tournamentId: new mongoose_1.Types.ObjectId(comment.tournamentId),
        notification: "You have a reply to your previous comment"
    });
    return notification;
});
//FLAG COMMENT BY MODERATOR
const flagComment = (commentId, reason) => __awaiter(void 0, void 0, void 0, function* () {
    const commentFlagged = yield comment_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(commentId) }, { $set: {
            isFlagged: true,
            reason: reason
        } });
    if (commentFlagged.modifiedCount === 0) {
        const replyFlagged = yield comment_repo_1.default.updateOne({ "replies._id": commentId }, { $set: {
                "replies.$.flagReply": true,
                "replies.$.reason": reason
            } });
    }
    return comment_response_1.comment_responses.comment_flagged;
});
exports.default = {
    createComment,
    updateComment,
    findComment,
    ViewAllComments,
    deleteComment,
    createReply,
    flagComment
};
