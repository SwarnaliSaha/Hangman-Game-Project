"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const NotificationSchema = new base_schema_1.BaseSchema({
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    tournamentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    notification: {
        type: String,
        required: true
    }
});
exports.NotificationModel = (0, mongoose_1.model)("Notification", NotificationSchema);
