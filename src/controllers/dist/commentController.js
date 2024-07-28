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
var commentService_1 = require("../services/commentService");
var commentModel_1 = require("../models/commentModel");
var console_1 = require("console");
var mongoose_1 = require("mongoose");
var CommentController = /** @class */ (function () {
    function CommentController() {
    }
    CommentController.addComment = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, postId, content, comment, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        postId = req.params.postId;
                        content = req.body.content;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, commentService_1["default"].addComment(postId, userId, content)];
                    case 2:
                        comment = _b.sent();
                        res.status(201).json(comment);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommentController.getComments = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var post, comments, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post = req.params.postId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, commentService_1["default"].getComments(post)];
                    case 2:
                        comments = _a.sent();
                        res.status(200).json(comments);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Like or dislike a comment
    CommentController.likeOrDislikeComment = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var commentId, userId_1, action, comment, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        commentId = req.params.commentId;
                        userId_1 = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        // log(userId)
                        if (!userId_1) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        action = req.body.action;
                        return [4 /*yield*/, commentModel_1["default"].findById(commentId)];
                    case 1:
                        comment = _b.sent();
                        if (!comment) {
                            return [2 /*return*/, res.status(404).json({ message: 'Comment not found' })];
                        }
                        if (action === 'like') {
                            if (comment.likes.includes(userId_1)) {
                                comment.likes = comment.likes.filter(function (id) { return id && id.toString() !== userId_1; });
                            }
                            else {
                                comment.likes.push(userId_1);
                                comment.dislikes = comment.dislikes.filter(function (id) { return id && id.toString() !== userId_1; });
                            }
                        }
                        else if (action === 'dislike') {
                            if (comment.dislikes.includes(userId_1)) {
                                comment.dislikes = comment.dislikes.filter(function (id) { return id && id.toString() !== userId_1; });
                            }
                            else {
                                comment.dislikes.push(userId_1);
                                comment.likes = comment.likes.filter(function (id) { return id && id.toString() !== userId_1; });
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid action' })];
                        }
                        return [4 /*yield*/, comment.save()];
                    case 2:
                        _b.sent();
                        res.status(200).json({ message: 'Comment vote status updated', comment: comment });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommentController.replyToComment = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var commentId, user, content, comment, newReply, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        commentId = req.params.commentId;
                        user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        content = req.body.content;
                        console_1.log(commentId, user, content);
                        return [4 /*yield*/, commentModel_1["default"].findById(commentId)];
                    case 1:
                        comment = _b.sent();
                        if (!comment) {
                            return [2 /*return*/, res.status(404).json({ message: 'Comment not found' })];
                        }
                        newReply = new commentModel_1["default"]({
                            post: comment.post,
                            user: user,
                            content: content
                        });
                        console_1.log('newReply:', newReply);
                        return [4 /*yield*/, newReply.save()];
                    case 2:
                        _b.sent();
                        // comment.replies.push(newReply._id);
                        comment.replies.push(new mongoose_1["default"].Types.ObjectId(newReply._id));
                        return [4 /*yield*/, comment.save()];
                    case 3:
                        _b.sent();
                        res.status(201).json({ message: 'Reply added', newReply: newReply });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CommentController;
}());
exports["default"] = CommentController;
