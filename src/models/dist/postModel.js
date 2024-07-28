"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// Define the post schema
var postSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    content: { type: String, required: true },
    image: [{ type: Object }],
    category: {
        type: String,
        "enum": ['Kidney', 'Headache', 'Stomachache', 'Leg-Pain', 'Malaria'],
        required: true
    },
    upvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }],
    viewCount: { type: Number, "default": 0 }
}, { timestamps: true });
// Create and export the Post model
var Post = mongoose_1["default"].model('Post', postSchema);
exports["default"] = Post;
