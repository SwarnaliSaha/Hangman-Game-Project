"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Roles = {
    admin: new mongoose_1.default.mongo.ObjectId("6454a474cb8cc5251b249405"),
    player: new mongoose_1.default.mongo.ObjectId("6454a497cb8cc5251b249408"),
    moderator: new mongoose_1.default.mongo.ObjectId("6454a4b2cb8cc5251b24940b")
};
