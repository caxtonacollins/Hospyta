"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var commentModel_1 = require("../models/commentModel");
var postModel_1 = require("../models/postModel");
var CommentService = /** @class */ (function () {
    function CommentService() {
    }
    CommentService.addComment = function (postId, userId, content) {
        return __awaiter(this, void 0, Promise, function () {
            var post, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postModel_1["default"].findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new Error('Post not found');
                        }
                        comment = new commentModel_1["default"]({
                            post: postId,
                            user: userId,
                            content: content
                        });
                        post.comments.push(new mongoose_1["default"].Types.ObjectId(comment._id));
                        return [4 /*yield*/, post.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, comment.save()];
                }
            });
        });
    };
    CommentService.replyToComment = function (commentId, userId, content) {
        return __awaiter(this, void 0, Promise, function () {
            var comment, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, commentModel_1["default"].findById(commentId)];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            throw new Error('Comment not found');
                        }
                        reply = new commentModel_1["default"]({
                            post: comment.post,
                            user: userId,
                            content: content
                        });
                        comment.replies.push(new mongoose_1["default"].Types.ObjectId(reply._id));
                        return [4 /*yield*/, comment.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, reply.save()];
                }
            });
        });
    };
    // static async getComments(postId: string): Promise<IComment[]> {
    //   return Comment.find({ post: postId }).populate('user', 'firstName profilePicture');
    // }
    CommentService.getComments = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var comments, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, commentModel_1["default"].find({ post: postId })
                                .populate('user', 'userName email')
                                .populate({
                                path: 'replies',
                                populate: { path: 'user', select: 'userName email profilePicture' }
                            })
                                .exec()];
                    case 1:
                        comments = _a.sent();
                        return [2 /*return*/, comments.map(function (comment) { return (__assign(__assign({}, comment.toObject()), { likeCount: comment.likes.length, dislikeCount: comment.dislikes.length, replyCount: comment.replies.length })); })];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CommentService;
}());
exports["default"] = CommentService;
