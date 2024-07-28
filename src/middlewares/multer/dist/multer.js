"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
// type DestinationCallback = (error: Error | null, destination: string) => void
// type FileNameCallback = (error: Error | null, filename: string) => void
// const storage = multer.diskStorage({
//   destination: (
//     request: Request,
//     file: Express.Multer.File,
//     callback: DestinationCallback
//   ): void => {
//     callback(null, "public");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     callback: FileNameCallback
//   ): void => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     callback(null, file.originalname + "-" + uniqueSuffix);
//   }
// })
// const fileFilter = (
//   request: Request,
//   file: Express.Multer.File,
//   callback: FileFilterCallback
// ): void => {
//   let ext = path.extname(file.originalname);
//   if (
//     ext !== ".png" &&
//     ext !== ".jpg" &&
//     ext !== ".jpeg"
//   ) {
//     callback(new Error(`unsupported file format`));
//   }
//   callback(null, true);
// }
var storage = multer_1["default"].memoryStorage();
var upload = multer_1["default"]({
    storage: storage
});
exports["default"] = upload;
