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
const pipeline_1 = require("../../utility/pipeline");
const notification_repo_1 = __importDefault(require("./notification.repo"));
//CREATE NOTIFICATION
const createNotification = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield notification_repo_1.default.create(comment);
    return record;
});
//FIND A NOTIFICATION
// const findComment = async(filter:Partial<INotification>) => {
//     const foundcomment = await notificationRepo.findOne(filter);
//     if(!foundcomment) throw comment_responses.comment_not_found;
//     return foundcomment;
// }
//VIEW ALL NOTIFICATIONS
const ViewAllNotifications = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.createPipeline)(query);
    const result = yield notification_repo_1.default.find(pipeline);
    return result;
});
exports.default = {
    createNotification,
    ViewAllNotifications
};
