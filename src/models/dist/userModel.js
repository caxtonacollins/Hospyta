"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// Create the User schema
// some of the fields might not be required
var UserSchema = new mongoose_1.Schema({
    profilePicture: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, "default": false },
    verificationOTP: { type: Number },
    otpCreationTime: { type: Date },
    role: { type: String, "enum": ['user', 'admin'], "default": 'user' }
});
var Users = mongoose_1["default"].model('User', UserSchema);
exports["default"] = Users;
