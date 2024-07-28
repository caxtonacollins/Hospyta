"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getImageUrl = exports.uploads = void 0;

var _cloudinary = require("cloudinary");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var uploads = function uploads(file, folder) {
  return new Promise(function (resolve) {
    _cloudinary.v2.uploader.upload(file, function (result) {
      resolve({
        url: result.url,
        id: result.public_id
      });
    }, {
      resource_type: "auto",
      folder: folder
    });
  });
};

exports.uploads = uploads;

var getImageUrl = function getImageUrl() {
  var transformations = {
    width: 300,
    height: 200,
    crop: "fill"
  };

  var imageUrl = _cloudinary.v2.url("anonymous", transformations);

  return imageUrl;
};

exports.getImageUrl = getImageUrl;
var _default = _cloudinary.v2; // import { v2 as cloudinary } from "cloudinary";
// import dotenv from 'dotenv';
// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });
// export const uploads = (file: string, folder: string) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file,
//       {
//         resource_type: "auto",
//         folder: folder,
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve({
//           url: result?.url,
//           id: result?.public_id,
//         });
//       }
//     );
//   });
// };
// export default cloudinary;

exports["default"] = _default;