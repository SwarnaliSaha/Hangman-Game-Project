"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const TournamentSchema = new base_schema_1.BaseSchema({
    tournamentName: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Category',
        required: true
    },
    level: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Level',
        required: true
    },
    words: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Word',
        required: true
    },
    adminApproval: {
        type: String,
        default: "pending"
    },
    ongoing: {
        type: Boolean,
        default: false
    }
});
exports.TournamentModel = (0, mongoose_1.model)("Tournament", TournamentSchema);
