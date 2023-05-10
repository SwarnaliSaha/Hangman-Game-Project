"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const role_router_1 = __importDefault(require("./role/role.router"));
const category_router_1 = __importDefault(require("./category/category.router"));
const level_router_1 = __importDefault(require("./level/level.router"));
const word_router_1 = __importDefault(require("./words/word.router"));
const tournament_router_1 = __importDefault(require("./tournaments/tournament.router"));
const comment_router_1 = __importDefault(require("./comments/comment.router"));
const user_router_1 = __importDefault(require("./users/user.router"));
exports.default = {
    AuthRouter: auth_router_1.default,
    RoleRouter: role_router_1.default,
    UserRouter: user_router_1.default,
    CategoryRouter: category_router_1.default,
    LevelRouter: level_router_1.default,
    WordRouter: word_router_1.default,
    TournamentRouter: tournament_router_1.default,
    CommentRouter: comment_router_1.default
};
