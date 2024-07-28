import { Router } from 'express';
import PostController from '../controllers/postController';
import { Authenticate } from '../middlewares/guard/Authenticate';
import upload from '../config/cloudinaryMulterStorage';

const router = Router();

router.post(
  '/',
  Authenticate,
  upload.array('post_images', 10),
  PostController.createPost
);

router.put('/:postId', Authenticate, PostController.updatePost);
router.get('/', PostController.getPosts);
router.get('/:postId', Authenticate, PostController.getPostById); // GET {{URL}}/post/postId?sortField=upvotes&sortOrder=-1, GET {{URL}}/post/postId?sortField=time&sortOrder=1

router.post('/upvote/:postId', Authenticate, PostController.upvotePost);
router.post('/downvote/:postId', Authenticate, PostController.downvotePost);
router.delete('/:postId', Authenticate, PostController.deletePost);

export default router;
