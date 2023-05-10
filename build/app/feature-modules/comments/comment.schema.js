"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const CommentSchema = new base_schema_1.BaseSchema({
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    tournamentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [
        {
            senderId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User"
            },
            reply: String,
            flagReply: {
                type: Boolean,
                default: false
            },
            reason: String,
            isDeleted: {
                type: Boolean,
                default: false
            }
        }
    ],
    isFlagged: {
        type: Boolean,
        default: false
    },
    reason: {
        type: String,
        default: ""
    }
});
exports.CommentModel = (0, mongoose_1.model)("Comment", CommentSchema);
