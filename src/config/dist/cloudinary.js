"use strict";
exports.__esModule = true;
exports.uploads = void 0;
var cloudinary_1 = require("cloudinary");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
exports.uploads = function (file, folder) {
    return new Promise(function (resolve, reject) {
        cloudinary_1.v2.uploader.upload(file, {
            resource_type: "auto",
            folder: folder
        }, function (error, result) {
            if (error)
                reject(error);
            else
                resolve({
                    url: result === null || result === void 0 ? void 0 : result.url,
                    id: result === null || result === void 0 ? void 0 : result.public_id
                });
        });
    });
};
exports["default"] = cloudinary_1.v2;
