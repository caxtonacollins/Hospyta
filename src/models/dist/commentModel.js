"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    replies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', "default": [] }],
    dislikes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', "default": [] }]
}, { timestamps: true });
var Comment = mongoose_1["default"].model('Comment', commentSchema);
exports["default"] = Comment;
