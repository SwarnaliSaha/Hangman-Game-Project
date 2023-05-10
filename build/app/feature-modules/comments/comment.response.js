"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment_responses = void 0;
exports.comment_responses = {
    comment_not_added: {
        statusCode: 400,
        message: "comment not added!"
    },
    reply_not_added: {
        statusCode: 200,
        message: "reply is not sent."
    },
    comment_updated: {
        statusCode: 200,
        message: "comment is updated successfully"
    },
    comment_not_updated: {
        statusCode: 400,
        message: "comment is not updated"
    },
    comment_deleted: {
        statusCode: 200,
        message: "comment is deleted successfully"
    },
    comment_not_deleted: {
        statusCode: 400,
        message: "comment is not deleted"
    },
    comment_not_found: {
        statusCode: 404,
        message: "comment not found"
    },
    comment_flagged: {
        statusCode: 200,
        message: "this comment is flagged"
    }
};
