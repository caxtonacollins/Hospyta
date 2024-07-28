"use strict";
exports.__esModule = true;
var console_1 = require("console");
var errorMiddleware = function (err, req, res, next) {
    console_1.log('error:', err);
    res.status(500).json({
        error: true,
        message: err.message
    });
};
exports["default"] = errorMiddleware;
