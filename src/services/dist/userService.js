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
exports.UserService = void 0;
var bcrypt_1 = require("bcrypt");
var console_1 = require("console");
var userModel_1 = require("../models/userModel");
var mongodb_1 = require("mongodb");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.checkThatUserExistWithPhoneNumber = function (number) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1["default"].findOne({ number: number })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.checkThatUserExistWithEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1["default"].findOne({ email: email }).populate("")];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.checkThatPasswordIsValid = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, hashedPassword, match, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user || !user.password) {
                            return [2 /*return*/, false];
                        }
                        hashedPassword = user.password;
                        return [4 /*yield*/, bcrypt_1["default"].compare(password, hashedPassword)];
                    case 2:
                        match = _a.sent();
                        return [2 /*return*/, match];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error(error_3.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.isValidEmail = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    UserService.isValidPhoneNumber = function (phoneNumber) {
        var phoneRegex = /^\d{11}$/;
        return phoneRegex.test(phoneNumber);
    };
    UserService.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                try {
                    users = userModel_1["default"].find({}).select("-password -verificationOTP");
                    return [2 /*return*/, users];
                }
                catch (error) {
                    console.error(error);
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    UserService.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                try {
                    user = userModel_1["default"].findOne({ _id: new mongodb_1.ObjectId(id) }).select("-password -verificationOTP");
                    return [2 /*return*/, user];
                }
                catch (error) {
                    console.error(error);
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    UserService.updateUserById = function (id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var users, updatedUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1["default"].updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updateData })];
                    case 1:
                        users = _a.sent();
                        if (!users)
                            throw new Error("No users found🥲");
                        updatedUser = userModel_1["default"].findOne({ _id: new mongodb_1.ObjectId(id) }).select("-password -verificationOTP");
                        return [2 /*return*/, updatedUser];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.updateUserByEmail = function (email, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var users, updatedUser, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1["default"].updateOne({ email: email }, { $set: updateData })];
                    case 1:
                        users = _a.sent();
                        if (!users)
                            throw new Error("No users found🥲");
                        return [4 /*yield*/, userModel_1["default"].findOne({ email: email }).select("-password -verificationOTP")];
                    case 2:
                        updatedUser = _a.sent();
                        console_1.log(updatedUser);
                        return [2 /*return*/, updatedUser];
                    case 3:
                        error_5 = _a.sent();
                        console.error(error_5);
                        throw new Error(error_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
