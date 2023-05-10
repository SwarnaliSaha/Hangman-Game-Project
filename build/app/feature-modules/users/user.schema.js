"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base-schema");
const UserSchema = new base_schema_1.BaseSchema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Role',
        required: true,
    },
    tournamentsPlayed: [
        {
            tournamentId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Tournamnet'
            },
            timeTaken: {
                type: String
            },
            score: {
                type: Number
            }
        }
    ],
    score: {
        type: Number,
        default: 0
    },
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
