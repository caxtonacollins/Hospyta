"use strict";
exports.__esModule = true;
exports.app = void 0;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var index_1 = require("./routes/index");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
require("dotenv/config");
var mongoose_1 = require("mongoose");
var wistonLogger_1 = require("./config/wistonLogger");
var notificationController_1 = require("./controllers/notificationController");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_jsdoc_1 = require("swagger-jsdoc");
// Load environment variables
dotenv_1["default"].config();
var app = express_1["default"]();
exports.app = app;
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server);
// app.use(cors(corsOptions));
app.use(cors_1["default"]());
app.options('*', cors_1["default"]());
app.use(body_parser_1["default"].json());
app.use(cookie_parser_1["default"]());
// parse json request body
app.use(express_1["default"].json());
// parse urlencoded request body
app.use(express_1["default"].urlencoded({ extended: true }));
// Serve static files
app.use(express_1["default"].static(__dirname + "/public"));
app.use(errorMiddleware_1["default"]);
// connectDB();
var uri = process.env.MONGODB_URI;
mongoose_1["default"].connect(uri, {}).then(function () {
    wistonLogger_1.logger.info('Connected to MongoDB✈️');
});
// Middleware to add db to req
app.use(function (req, res, next) {
    next();
});
// Swagger docs
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hospypa API',
            version: '1.0.0'
        },
        servers: [
            {
                url: '/api/v1',
                description: 'Development server'
            },
        ]
    },
    apis: ['./src/swagger_docs/*.yaml', './routes/*.ts']
};
var specs = swagger_jsdoc_1["default"](options);
app.use('/hospypa', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(specs));
app.use('/api/v1', index_1["default"]);
io.on('connection', function (socket) {
    console.log('a user connected 😎');
    socket.on('disconnect', function () {
        console.log('user disconnected 😌');
    });
});
// Passing the Socket.IO instance to the notification controller
notificationController_1.initSocket(io);
