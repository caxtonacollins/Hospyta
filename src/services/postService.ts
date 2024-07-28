import { IRequest } from '../interfaces';
import Post, { IPost } from '../models/postModel';
import { SortOrder } from 'mongoose';

class PostService {
  static async createPost(
    userId: string,
    content: string,
    image: string,
    category: string
  ) {
    const post = new Post({ user: userId, content, image, category });
    await post.save();
    return post;
  }

  static async updatePost(
    postId: string,
    userId: string,
    updates: Partial<IPost>
  ): Promise<IPost | null> {
    const post = await Post.findOne({ _id: postId, user: userId });
    if (!post) {
      throw new Error('Post not found or not authorized');
    }
    Object.assign(post, updates);
    return post.save();
  }

  static async getPosts(sortBy: 'time' | 'upvotes', category: string) {
    const sortOptions: { [key: string]: 1 | -1 } = {
      time: -1, // Descending order
      upvotes: -1, // Descending order
    };

    const sortField = sortOptions[sortBy];

    const posts = await Post.find(category ? { category } : {})
      .populate('user', 'userName email') // Populate user field with user details
      .sort({ [sortBy]: sortField })
      .exec();

    if (!posts) {
      throw new Error('Posts not found');
    }

    return posts.map(post => ({
      ...post.toObject(),
      viewCount: post.viewCount || 0,
      upvoteCount: post.upvotes.length,
      downvoteCount: post.downvotes.length,
      replyCount: post.comments.length
    }));
  }

  static async getPostById(postId: string, sortField: string, sortOrder: 1 | -1) {
    try {
      const sortOptions: { [key: string]: 1 | -1 } = {
        time: sortOrder,
        upvotes: sortOrder
      };

      const post = await Post.findById(postId)
        .populate({
          path: 'comments',
          options: {
            sort: { [sortField]: sortOptions[sortField] || -1 } // Default to descending order if field is not found
          }
        })
        .populate('user', 'userName email')
        .exec();

      if (!post) {
        throw new Error('Post not found');
      }

      return {
        ...post.toObject(),
        upvoteCount: post.upvotes.length,
        downvoteCount: post.downvotes.length,
        replyCount: post.comments.length
      };
    } catch (error) {
      throw error
    }
  }

  static async upvotePost(postId: string, userId: string) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if user has already liked the post
      if (post.upvotes.includes(userId)) {
        // Unlike the post
        post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);
      } else {
        // Add user to upvotes
        post.upvotes.push(userId);
        // Remove user from downvotes if they previously disliked the post
        post.downvotes = post.downvotes.filter(
          (id) => id.toString() !== userId
        );
      }

      await post.save();

      return post;
    } catch (error) {
      throw error;
    }
  }

  static async downvotePost(postId: string, userId: string) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if user has already disliked the post
      if (post.downvotes.includes(userId)) {
        // Remove the dislike
        post.downvotes = post.downvotes.filter(
          (id) => id.toString() !== userId
        );
      } else {
        // Add user to downvotes
        post.downvotes.push(userId);
        // Remove user from upvotes if they previously liked the post
        post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);
      }

      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: string, userId: string): Promise<void> {
    const result = await Post.deleteOne({ _id: postId, user: userId });
    if (result.deletedCount === 0) {
      throw new Error('Post not found or not authorized');
    }
  }
}

export default PostService;
