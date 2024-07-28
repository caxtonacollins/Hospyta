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
var postModel_1 = require("../models/postModel");
var PostService = /** @class */ (function () {
    function PostService() {
    }
    PostService.createPost = function (userId, content, image, category) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post = new postModel_1["default"]({ user: userId, content: content, image: image, category: category });
                        return [4 /*yield*/, post.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostService.updatePost = function (postId, userId, updates) {
        return __awaiter(this, void 0, Promise, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postModel_1["default"].findOne({ _id: postId, user: userId })];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new Error('Post not found or not authorized');
                        }
                        Object.assign(post, updates);
                        return [2 /*return*/, post.save()];
                }
            });
        });
    };
    PostService.getPosts = function (sortBy, category) {
        return __awaiter(this, void 0, void 0, function () {
            var sortOptions, sortField, posts;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sortOptions = {
                            time: -1,
                            upvotes: -1
                        };
                        sortField = sortOptions[sortBy];
                        return [4 /*yield*/, postModel_1["default"].find(category ? { category: category } : {})
                                .populate('user', 'userName email') // Populate user field with user details
                                .sort((_a = {}, _a[sortBy] = sortField, _a))
                                .exec()];
                    case 1:
                        posts = _b.sent();
                        if (!posts) {
                            throw new Error('Posts not found');
                        }
                        return [2 /*return*/, posts.map(function (post) { return (__assign(__assign({}, post.toObject()), { viewCount: post.viewCount || 0, upvoteCount: post.upvotes.length, downvoteCount: post.downvotes.length, replyCount: post.comments.length })); })];
                }
            });
        });
    };
    PostService.getPostById = function (postId, sortField, sortOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var sortOptions, post, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        sortOptions = {
                            time: sortOrder,
                            upvotes: sortOrder
                        };
                        return [4 /*yield*/, postModel_1["default"].findById(postId)
                                .populate({
                                path: 'comments',
                                options: {
                                    sort: (_a = {}, _a[sortField] = sortOptions[sortField] || -1, _a) // Default to descending order if field is not found
                                }
                            })
                                .populate('user', 'userName email')
                                .exec()];
                    case 1:
                        post = _b.sent();
                        if (!post) {
                            throw new Error('Post not found');
                        }
                        return [2 /*return*/, __assign(__assign({}, post.toObject()), { upvoteCount: post.upvotes.length, downvoteCount: post.downvotes.length, replyCount: post.comments.length })];
                    case 2:
                        error_1 = _b.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostService.upvotePost = function (postId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var post, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, postModel_1["default"].findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new Error('Post not found');
                        }
                        // Check if user has already liked the post
                        if (post.upvotes.includes(userId)) {
                            // Unlike the post
                            post.upvotes = post.upvotes.filter(function (id) { return id.toString() !== userId; });
                        }
                        else {
                            // Add user to upvotes
                            post.upvotes.push(userId);
                            // Remove user from downvotes if they previously disliked the post
                            post.downvotes = post.downvotes.filter(function (id) { return id.toString() !== userId; });
                        }
                        return [4 /*yield*/, post.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, post];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostService.downvotePost = function (postId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var post, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, postModel_1["default"].findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new Error('Post not found');
                        }
                        // Check if user has already disliked the post
                        if (post.downvotes.includes(userId)) {
                            // Remove the dislike
                            post.downvotes = post.downvotes.filter(function (id) { return id.toString() !== userId; });
                        }
                        else {
                            // Add user to downvotes
                            post.downvotes.push(userId);
                            // Remove user from upvotes if they previously liked the post
                            post.upvotes = post.upvotes.filter(function (id) { return id.toString() !== userId; });
                        }
                        return [4 /*yield*/, post.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, post];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostService.deletePost = function (postId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postModel_1["default"].deleteOne({ _id: postId, user: userId })];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount === 0) {
                            throw new Error('Post not found or not authorized');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostService;
}());
exports["default"] = PostService;
