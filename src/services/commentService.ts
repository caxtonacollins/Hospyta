import mongoose from 'mongoose';
import Comment, { IComment } from '../models/commentModel';
import Post from '../models/postModel';

class CommentService {
  static async addComment(postId: string, userId: string, content: string): Promise<IComment> {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    const comment = new Comment({
      post: postId,
      user: userId,
      content
    });
    post.comments.push(new mongoose.Types.ObjectId(comment._id));
    await post.save();
    return comment.save();
  }

  static async replyToComment(commentId: string, userId: string, content: string): Promise<IComment> {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    const reply = new Comment({
      post: comment.post,
      user: userId,
      content
    });
    comment.replies.push(new mongoose.Types.ObjectId(reply._id));
    await comment.save();
    return reply.save();
  }

  // static async getComments(postId: string): Promise<IComment[]> {
  //   return Comment.find({ post: postId }).populate('user', 'firstName profilePicture');
  // }

  static async getComments(postId: string) {
    try {
      const comments = await Comment.find({ post: postId })
        .populate('user', 'userName email')
        .populate({
          path: 'replies',
          populate: { path: 'user', select: 'userName email profilePicture' }
        })
        .exec();

      return comments.map(comment => ({
        ...comment.toObject(),
        likeCount: comment.likes.length,
        dislikeCount: comment.dislikes.length,
        replyCount: comment.replies.length
      }));
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
