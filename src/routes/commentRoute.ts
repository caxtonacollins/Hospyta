import { Router } from 'express';
import CommentController from '../controllers/commentController';
import { Authenticate } from '../middlewares/guard/Authenticate';

const router = Router();

router.post('/:postId', Authenticate, CommentController.addComment);
router.post(
  '/reply/:commentId',
  Authenticate,
  CommentController.replyToComment
);
router.get('/:postId', CommentController.getComments);
router.post(
  '/likeOrDislikeComment/:commentId',
  Authenticate,
  CommentController.likeOrDislikeComment
);

export default router;
