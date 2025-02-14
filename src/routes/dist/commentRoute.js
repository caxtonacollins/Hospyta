"use strict";
exports.__esModule = true;
var express_1 = require("express");
var commentController_1 = require("../controllers/commentController");
var Authenticate_1 = require("../middlewares/guard/Authenticate");
var router = express_1.Router();
router.post('/:postId', Authenticate_1.Authenticate, commentController_1["default"].addComment);
router.post('/reply/:commentId', Authenticate_1.Authenticate, commentController_1["default"].replyToComment);
router.get('/:postId', commentController_1["default"].getComments);
router.post('/likeOrDislikeComment/:commentId', Authenticate_1.Authenticate, commentController_1["default"].likeOrDislikeComment);
exports["default"] = router;
