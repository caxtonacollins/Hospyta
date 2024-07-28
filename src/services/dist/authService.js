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
exports.verifyOTP = exports.verifyEmail = void 0;
var userService_1 = require("../services/userService");
var userModel_1 = require("../models/userModel");
var console_1 = require("console");
var checkIfOtpExpire_1 = require("../helpers/checkIfOtpExpire");
/**
 * @method verifyEmail
 * @static
 * @async
 * @param {string} email
 * @param {string} verificationCode
 */
exports.verifyEmail = function (email, verificationCode) { return __awaiter(void 0, void 0, void 0, function () {
    var users, isExpired, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 1:
                users = _a.sent();
                if (!users) {
                    throw new Error("Users with email: " + email + " does not exist");
                }
                return [4 /*yield*/, exports.verifyOTP(email, verificationCode)];
            case 2:
                isExpired = _a.sent();
                console_1.log(isExpired);
                if (!(isExpired === false)) return [3 /*break*/, 4];
                return [4 /*yield*/, userModel_1["default"].findOneAndUpdate({ _id: users._id }, { $set: { verified: true, verificationOTP: "", otpCreationTime: "" } })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error("Error verifying email:", error_1);
                throw new Error(error_1.message);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.verifyOTP = function (email, verificationCode) { return __awaiter(void 0, void 0, void 0, function () {
    var user, UsersOtp, otpCreationTime, isExpired, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, userService_1.UserService.checkThatUserExistWithEmail(email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error("Users with email: " + email + " does not exist");
                }
                UsersOtp = user.verificationOTP.toString();
                console_1.log(verificationCode, UsersOtp);
                if (!(verificationCode === UsersOtp)) return [3 /*break*/, 4];
                otpCreationTime = user.otpCreationTime;
                if (!otpCreationTime) {
                    throw new Error("OTP creation time is not available");
                }
                isExpired = checkIfOtpExpire_1.checkIfOtpIsExpired(otpCreationTime);
                if (!(isExpired === false)) return [3 /*break*/, 3];
                return [4 /*yield*/, userModel_1["default"].updateOne({ _id: user._id }, { $set: { verificationOTP: "", otpCreationTime: "" } })];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
            case 3: return [2 /*return*/, false];
            case 4:
                console.log({ error: true, message: "Incorrect OTP😢" });
                throw new Error("Incorrect OTP😢");
            case 5: return [2 /*return*/, true];
            case 6:
                error_2 = _a.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
