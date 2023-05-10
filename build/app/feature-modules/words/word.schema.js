"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const WordSchema = new base_schema_1.BaseSchema({
    word: {
        type: String,
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
    }
});
exports.WordModel = (0, mongoose_1.model)("Word", WordSchema);
