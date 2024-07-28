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
var postService_1 = require("../services/postService");
var postModel_1 = require("../models/postModel");
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.createPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, content, category, fileUrls, uploadResults, postData, newPost, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.body.userId;
                        _a = req.body, content = _a.content, category = _a.category;
                        if (!content || !category) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ message: 'Content and category are required' })];
                        }
                        fileUrls = [];
                        if (req.files && Array.isArray(req.files)) {
                            uploadResults = req.files.map(function (file) { return ({
                                fileURL: file.path,
                                cloudinaryId: file.filename
                            }); });
                            // log("uploadResults:", uploadResults)
                            fileUrls.push.apply(fileUrls, uploadResults);
                        }
                        postData = {
                            user: userId,
                            content: content,
                            image: fileUrls,
                            category: category
                        };
                        return [4 /*yield*/, postModel_1["default"].create(postData)];
                    case 1:
                        newPost = _b.sent();
                        res.status(201).json({
                            error: false,
                            message: 'Post created successfully',
                            data: newPost
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.updatePost = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, postId, updates, post, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        postId = req.params.postId;
                        updates = req.body;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1["default"].updatePost(postId, userId, updates)];
                    case 2:
                        post = _b.sent();
                        res.status(200).json(post);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.getPosts = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, sortBy, category, posts, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.query, _b = _a.sortBy, sortBy = _b === void 0 ? 'time' : _b, category = _a.category;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1["default"].getPosts(sortBy, category)];
                    case 2:
                        posts = _c.sent();
                        res.status(200).json(posts);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.getPostById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, sortField, sortOrder, post, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.params.postId;
                        sortField = req.query.sortField || 'time';
                        sortOrder = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1["default"].getPostById(postId, sortField, sortOrder)];
                    case 2:
                        post = _a.sent();
                        res.status(200).json(post);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.upvotePost = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, postId, post, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        postId = req.params.postId;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1["default"].upvotePost(postId, userId)];
                    case 2:
                        post = _b.sent();
                        res.status(200).json(post);
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.downvotePost = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, postId, post, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        postId = req.params.postId;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1["default"].downvotePost(postId, userId)];
                    case 2:
                        post = _b.sent();
                        res.status(200).json(post);
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _b.sent();
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.deletePost = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, postId, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        postId = req.params.postId;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postService_1["default"].deletePost(postId, userId)];
                    case 2:
                        _b.sent();
                        res.status(204).send();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _b.sent();
                        next(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
exports["default"] = PostController;
