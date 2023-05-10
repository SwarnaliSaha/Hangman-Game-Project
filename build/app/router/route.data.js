"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const route_type_1 = require("./route.type");
const index_1 = __importDefault(require("../feature-modules/index"));
const middlewares_1 = require("../utility/middlewares");
exports.routes = [
    new route_type_1.Route('/auth', index_1.default.AuthRouter),
    new route_type_1.Route('/role', index_1.default.RoleRouter),
    new route_type_1.Route('/users', index_1.default.UserRouter),
    new route_type_1.Route("/category", index_1.default.CategoryRouter),
    new route_type_1.Route('/level', index_1.default.LevelRouter),
    new route_type_1.Route('/words', index_1.default.WordRouter),
    new route_type_1.Route('/tournament', index_1.default.TournamentRouter),
    new route_type_1.Route('/comments', index_1.default.CommentRouter)
];
exports.excludedPaths = [
    //   new ExcludedPath("/auth/login", "POST"),
    new middlewares_1.ExcludedPath("/auth/generateNewToken", "POST")
];
