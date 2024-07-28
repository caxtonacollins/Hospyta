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
var cloudinary_1 = require("../config/cloudinary");
var userModel_1 = require("../models/userModel");
var JwtHelper_1 = require("../helpers/JwtHelper");
var bcrypt_1 = require("bcrypt");
var authService_1 = require("../services/authService");
var console_1 = require("console");
var userService_1 = require("../services/userService");
var GenerateRandomToken_1 = require("../helpers/GenerateRandomToken");
var mail_1 = require("../services/mail");
/**
 * @class UserController
 */
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    /**
   * @method createUser
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise}
   */
    AuthController.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, lastName, email, userName, number, password, confirmPassword, trimmedEmail, isValidEmail, emailExist, numberExist, salt, hashedPassword, profilePictureUrl, imageBuffer, dataUri, result, userData, newUser, expiresIn, payload, token, createdUser, error_1, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console_1.log('req:', req.body);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 12, , 13]);
                        console_1.log(req.body);
                        _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, userName = _a.userName, number = _a.number, password = _a.password, confirmPassword = _a.confirmPassword;
                        if (!firstName ||
                            !lastName ||
                            !email ||
                            !userName ||
                            !number ||
                            !password ||
                            !confirmPassword) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ message: 'Name, email, and password are required' })];
                        }
                        trimmedEmail = email.trim();
                        isValidEmail = userService_1.UserService.isValidEmail(trimmedEmail);
                        if (!isValidEmail) {
                            throw new Error('Invalid email address');
                        }
                        return [4 /*yield*/, userService_1.UserService.checkThatUserExistWithEmail(email)];
                    case 2:
                        emailExist = _b.sent();
                        return [4 /*yield*/, userService_1.UserService.checkThatUserExistWithPhoneNumber(number)];
                    case 3:
                        numberExist = _b.sent();
                        if (emailExist) {
                            console.log("User " + email + " already exists");
                            throw new Error("User " + email + " already exists");
                        }
                        if (numberExist) {
                            console.log("User " + number + " already exists");
                            throw new Error("User " + number + " already exists");
                        }
                        if (password !== confirmPassword) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ error: true, message: 'passwords mismatch🥱' })];
                        }
                        salt = bcrypt_1["default"].genSaltSync(10);
                        hashedPassword = bcrypt_1["default"].hashSync(password, salt);
                        profilePictureUrl = '';
                        if (!req.file) return [3 /*break*/, 5];
                        imageBuffer = req.file.buffer.toString('base64');
                        dataUri = "data:" + req.file.mimetype + ";base64," + imageBuffer;
                        return [4 /*yield*/, cloudinary_1.uploads(dataUri, 'profile_pictures')];
                    case 4:
                        result = _b.sent();
                        profilePictureUrl = result.url;
                        console_1.log('profilePictureUrl:', profilePictureUrl);
                        _b.label = 5;
                    case 5:
                        userData = {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            userName: userName,
                            number: number,
                            password: hashedPassword,
                            verified: false,
                            profilePicture: profilePictureUrl
                        };
                        console_1.log("user:", userData);
                        return [4 /*yield*/, userModel_1["default"].create(userData)];
                    case 6:
                        newUser = _b.sent();
                        expiresIn = '30m';
                        payload = {
                            userId: newUser._id
                        };
                        token = JwtHelper_1["default"].generateToken(payload, expiresIn);
                        return [4 /*yield*/, userModel_1["default"].findById(newUser._id).select('-password -transactionPin -__v')];
                    case 7:
                        createdUser = _b.sent();
                        res.status(201).json({
                            error: false,
                            message: 'User created successfully',
                            data: createdUser,
                            token: token
                        });
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, GenerateRandomToken_1.generateAndSaveOTP(email)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _b.sent();
                        console.error(error_1);
                        throw new Error('Error sending otp: ' + error_1.message);
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method login
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    AuthController.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, passwordMatched, expiresIn, payload, token, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        console_1.log(req.body);
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            throw Error("All fields must be filled");
                        }
                        return [4 /*yield*/, userService_1.UserService.checkThatUserExistWithEmail(email)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: true, message: "User does not exist😒" })];
                        }
                        return [4 /*yield*/, userService_1.UserService.checkThatPasswordIsValid(email, password)];
                    case 2:
                        passwordMatched = _b.sent();
                        if (!passwordMatched) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json({ error: true, message: "Incorrect Password 😢" })];
                        }
                        console_1.log(user);
                        expiresIn = "30m";
                        payload = {
                            userId: user._id
                        };
                        token = JwtHelper_1["default"].generateToken(payload, expiresIn);
                        res.status(200).json({
                            error: false,
                            data: user,
                            token: token,
                            message: "login successful"
                        });
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
    AuthController.checkIfEmailExistAndSendToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, email, userExist, updateData, emailSender, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, GenerateRandomToken_1.generateRandomToken()];
                    case 1:
                        token = _a.sent();
                        email = req.body.email;
                        return [4 /*yield*/, userService_1.UserService.checkThatUserExistWithEmail(email)];
                    case 2:
                        userExist = _a.sent();
                        if (!userExist) {
                            throw new Error("User with email: " + email + " does not exist");
                        }
                        updateData = {
                            verificationOTP: token,
                            otpCreationTime: Date.now()
                        };
                        return [4 /*yield*/, userService_1.UserService.updateUserById(userExist._id, updateData)];
                    case 3:
                        _a.sent();
                        emailSender = new mail_1["default"](process.env.SENDER_EMAIL, process.env.SENDER_PASSWORD);
                        return [4 /*yield*/, emailSender.send(email, "Your OTP Code", "Your OTP code is: " + token)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ error: false, message: "token sent successfully to " + email })];
                    case 5:
                        error_4 = _a.sent();
                        console_1.log({ error: true, message: error_4.message });
                        res.status(500).json({ error: true, message: error_4.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method checkIfEmailExistAndSendToken
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    AuthController.verifyOtp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, verificationCode, verifyCode, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, verificationCode = _a.verificationCode;
                        return [4 /*yield*/, authService_1.verifyOTP(email, verificationCode)];
                    case 1:
                        verifyCode = _b.sent();
                        console_1.log("verifyCode:", verifyCode);
                        if (verifyCode === true) {
                            return [2 /*return*/, res.status(200).json({
                                    error: false,
                                    data: email,
                                    message: "OTP verification successful😁"
                                })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                error: true,
                                message: "OTP verification unsuccessful 😢"
                            })];
                    case 2:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method checkIfEmailExistAndSendToken
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    AuthController.setPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, salt, hash, updateData, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
                    case 1:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt_1["default"].hash(password, salt)];
                    case 2:
                        hash = _b.sent();
                        updateData = { password: hash };
                        // updating user by email
                        return [4 /*yield*/, userService_1.UserService.updateUserByEmail(email, updateData)];
                    case 3:
                        // updating user by email
                        _b.sent();
                        res.status(200).json({ error: false });
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _b.sent();
                        next(error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method resendOtp
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {boolean}
     */
    AuthController.resendOtp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        email = req.body.email;
                        return [4 /*yield*/, userService_1.UserService.checkThatUserExistWithEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        // Generate and save a new OTP
                        return [4 /*yield*/, GenerateRandomToken_1.generateAndSaveOTP(email)];
                    case 2:
                        // Generate and save a new OTP
                        _a.sent();
                        res
                            .status(200)
                            .json({ error: false, message: "email successful sent to " + email });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method createPassCode
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    AuthController.verifyEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, verificationCode, error_8, error_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    console_1.log(req.body);
                    _a = req.body, email = _a.email, verificationCode = _a.verificationCode;
                    if (!email || !verificationCode) {
                        throw new Error("Missing fields: Email and OTP required");
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService_1.verifyEmail(email, verificationCode)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _b.sent();
                    console.error("Error verifying email:", error_8);
                    throw new Error(error_8.message);
                case 4: 
                // console.log("Email verified errorfully.");
                return [2 /*return*/, res
                        .status(200)
                        .json({ error: false, message: "User verification successful😁" })];
                case 5:
                    error_9 = _b.sent();
                    next(error_9);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports["default"] = AuthController;
