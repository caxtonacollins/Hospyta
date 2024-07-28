"use strict";
exports.__esModule = true;
var express_1 = require("express");
var postController_1 = require("../controllers/postController");
var Authenticate_1 = require("../middlewares/guard/Authenticate");
var cloudinaryMulterStorage_1 = require("../config/cloudinaryMulterStorage");
var router = express_1.Router();
router.post('/', Authenticate_1.Authenticate, cloudinaryMulterStorage_1["default"].array('post_images', 10), postController_1["default"].createPost);
router.put('/:postId', Authenticate_1.Authenticate, postController_1["default"].updatePost);
router.get('/', postController_1["default"].getPosts);
router.get('/:postId', Authenticate_1.Authenticate, postController_1["default"].getPostById); // GET {{URL}}/post/postId?sortField=upvotes&sortOrder=-1, GET {{URL}}/post/postId?sortField=time&sortOrder=1
router.post('/upvote/:postId', Authenticate_1.Authenticate, postController_1["default"].upvotePost);
router.post('/downvote/:postId', Authenticate_1.Authenticate, postController_1["default"].downvotePost);
router["delete"]('/:postId', Authenticate_1.Authenticate, postController_1["default"].deletePost);
exports["default"] = router;
