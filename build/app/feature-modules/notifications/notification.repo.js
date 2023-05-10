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
Object.defineProperty(exports, "__esModule", { value: true });
const notification_schema_1 = require("./notification.schema");
const create = (notification) => notification_schema_1.NotificationModel.create(notification);
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return notification_schema_1.NotificationModel.updateOne(filter, update);
});
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_schema_1.NotificationModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
});
const find = (pipeline) => notification_schema_1.NotificationModel.aggregate(pipeline);
exports.default = {
    create,
    updateOne,
    findOne,
    find
};
