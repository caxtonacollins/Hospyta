import { Request, Response, NextFunction } from 'express';
import PostService from '../services/postService';
import { IUserRequest } from '../interfaces';
import cloudinary from '../config/cloudinaryMulterStorage';
import Post from '../models/postModel';
import { log } from 'console';

class PostController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.userId;
      const { content, category } = req.body;

      if (!content || !category) {
        return res
          .status(400)
          .json({ message: 'Content and category are required' });
      }

      // Handle file uploads
      let fileUrls: any[] = [];
      if (req.files && Array.isArray(req.files)) {
        const uploadResults = req.files.map((file: any) => ({
          fileURL: file.path,
          cloudinaryId: file.filename,
        }));

        // log("uploadResults:", uploadResults)

        fileUrls.push(...uploadResults);
      }

      // Create the post object to be inserted
      const postData = {
        user: userId,
        content,
        image: fileUrls,
        category,
      };

      const newPost = await Post.create(postData);

      res.status(201).json({
        error: false,
        message: 'Post created successfully',
        data: newPost,
      });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }

  static async updatePost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user?.id;
    const postId = req.params.postId;
    const updates = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const post = await PostService.updatePost(postId, userId, updates);
      res.status(200).json(post);
    } catch (error: any) {
      next(error);
    }
  }

  static async getPosts(req: Request, res: Response, next: NextFunction) {
    const { sortBy = 'time', category } = req.query;

    try {
      const posts = await PostService.getPosts(
        sortBy as 'time' | 'upvotes',
        category as string
      );
      res.status(200).json(posts);
    } catch (error: any) {
      next(error);
    }
  }

  static async getPostById(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    const sortField = (req.query.sortField as string) || 'time'; // Default to sorting by time
    let sortOrder: 1 | -1 = -1; // Default to descending order

    try {
      const post = await PostService.getPostById(postId, sortField, sortOrder);
      res.status(200).json(post);
    } catch (error: any) {
      next(error);
    }
  }

  static async upvotePost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user?.id;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const post = await PostService.upvotePost(postId, userId);
      res.status(200).json(post);
    } catch (error: any) {
      next(error);
    }
  }

  static async downvotePost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user?.id;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const post = await PostService.downvotePost(postId, userId);
      res.status(200).json(post);
    } catch (error: any) {
      next(error);
    }
  }

  static async deletePost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user?.id;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      await PostService.deletePost(postId, userId);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export default PostController;
