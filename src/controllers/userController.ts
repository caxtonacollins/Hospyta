import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { generateAndSaveOTP } from '../helpers/GenerateRandomToken';
import { log } from 'console';
import cloudinary, { uploads } from '../config/cloudinary';
import JwtHelper from '../helpers/JwtHelper';
import multer from 'multer';
import upload from '../middlewares/multer/multer';
import { UserService } from '../services/userService';
import Users from '../models/userModel';
import { ObjectId } from 'mongodb';

/**
 * @class UserController
 */
class UserController {
  /**
   * @method getAllUsers
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise}
   */

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json({ error: false, data: users });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @method getUserById
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise}
   */

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const users = await UserService.getUserById(id);
      if (!users) throw new Error('User not found 🥲');

      res.status(200).json({ error: false, data: users });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @method getUserById
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {object}
   */

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updateData = req.body;

      if (updateData.password) {
        return res.status(400).json({
          error: true,
          message: 'Authentication required to update or set password',
        });
      }

      const users = await UserService.updateUserById(id, updateData);

      return res.status(200).json({ error: false, data: users });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @method getUserById
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise}
   */

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const deletedUser = await Users.deleteOne({
        _id: new ObjectId(id),
      });

      // log("deletedUser:", deletedUser);
      res
        .status(200)
        .json({ error: false, message: 'staff deleted succesfully' });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }
}

export default UserController;
