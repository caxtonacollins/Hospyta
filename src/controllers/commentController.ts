import { Request, Response, NextFunction } from 'express';
import CommentService from '../services/commentService';
import { IUserRequest, IRequest } from '../interfaces';

import Comment from '../models/commentModel';
import { log } from 'console';
import mongoose from 'mongoose';

class CommentController {
  static async addComment(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user?.id;
    const postId = req.params.postId;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const comment = await CommentService.addComment(postId, userId, content);
      res.status(201).json(comment);
    } catch (error: any) {
      next(error);
    }
  }

  static async getComments(req: Request, res: Response, next: NextFunction) {
    const post = req.params.postId;

    try {
      const comments = await CommentService.getComments(post);
      res.status(200).json(comments);
    } catch (error: any) {
      next(error);
    }
  }

  // Like or dislike a comment
  static async likeOrDislikeComment(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const commentId = req.params.commentId;
      const userId = req.user?.id

      // log(userId)

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { action } = req.body; // 'like' or 'dislike'
      
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (action === 'like') {
        if (comment.likes.includes(userId)) {
          comment.likes = comment.likes.filter(
            (id) => id && id.toString() !== userId
          );
        } else {
          comment.likes.push(userId);
          comment.dislikes = comment.dislikes.filter(
            (id) => id && id.toString() !== userId
          );
        }
      } else if (action === 'dislike') {
        if (comment.dislikes.includes(userId)) {
          comment.dislikes = comment.dislikes.filter(
            (id) => id && id.toString() !== userId
          );
        } else {
          comment.dislikes.push(userId);
          comment.likes = comment.likes.filter(
            (id) => id && id.toString() !== userId
          );
        }
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }

      await comment.save();
      res.status(200).json({ message: 'Comment vote status updated', comment });
    } catch (error) {
      next(error);    
    }
  }


  static async replyToComment(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const commentId = req.params.commentId;
      const user = req.user?.id;
      const { content } = req.body;

      log(commentId, user, content);

      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      const newReply = new Comment({
        post: comment.post,
        user,
        content,
        // replies: [],
        // likes: [],
        // dislikes: []
      });

      log('newReply:', newReply);

      await newReply.save();
      // comment.replies.push(newReply._id);
      comment.replies.push(new mongoose.Types.ObjectId(newReply._id));
      
      await comment.save();

      res.status(201).json({ message: 'Reply added', newReply });
    } catch (error) {
      next(error)    
    }
  }
}

export default CommentController;
