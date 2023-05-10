"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const LevelSchema = new base_schema_1.BaseSchema({
    level: {
        type: String,
        required: true
    }
});
exports.LevelModel = (0, mongoose_1.model)("Level", LevelSchema);
