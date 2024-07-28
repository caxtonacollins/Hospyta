"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var cloudinary_1 = require("../config/cloudinary");
var storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1["default"],
    params: {
        folder: "Post_images",
        resource_type: "auto",
        public_id: function (req, file) { return file.originalname.split(".")[0].trim(); }
    }
});
var upload = multer_1["default"]({ storage: storage, limits: { fileSize: 1024 * 1024 } }); //limits of file size 1m
exports["default"] = upload;
