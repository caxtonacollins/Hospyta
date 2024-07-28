import { NextFunction, Request, Response } from "express";
import cloudinary, { uploads } from '../config/cloudinary';
import Users from '../models/userModel';
import JwtHelper from '../helpers/JwtHelper';
import bcrypt from "bcrypt";
import {
  verifyEmail,
  verifyOTP
} from "../services/authService";
import { log } from "console";
import { IUserRequest } from "../interfaces";
import {UserService} from "../services/userService";
import {
  generateAndSaveOTP,
  generateRandomToken,
} from "../helpers/GenerateRandomToken";
import EmailSender from "../services/mail";

/**
 * @class UserController
 */
class AuthController {

    /**
   * @method createUser
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise}
   */

    static async createUser(req: Request, res: Response, next: NextFunction) {
      log('req:', req.body);
      try {
        log(req.body);
        const { firstName, lastName, email, userName, number, password, confirmPassword } =
          req.body;
  
        if (
          !firstName ||
          !lastName ||
          !email ||
          !userName ||
          !number ||
          !password ||
          !confirmPassword
        ) {
          return res
            .status(400)
            .json({ message: 'Name, email, and password are required' });
        }
  
        // Trim email address
        const trimmedEmail = email.trim();
  
        const isValidEmail = UserService.isValidEmail(trimmedEmail);
  
        if (!isValidEmail) {
          throw new Error('Invalid email address');
        }
  
        const emailExist = await UserService.checkThatUserExistWithEmail(email);
        const numberExist = await UserService.checkThatUserExistWithPhoneNumber(
          number
        );
  
        if (emailExist) {
          console.log(`User ${email} already exists`);
          throw new Error(`User ${email} already exists`);
        }
  
        if (numberExist) {
          console.log(`User ${number} already exists`);
          throw new Error(`User ${number} already exists`);
        }
  
        if (password !== confirmPassword) {
          return res
            .status(400)
            .json({ error: true, message: 'passwords mismatch🥱' });
        }
  
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
  
        let profilePictureUrl = '';
        if (req.file) {
          // Converting the image data Buffer to a base64-encoded string
          const imageBuffer = req.file.buffer.toString('base64');
  
          // Constructing a data URI
          const dataUri = `data:${req.file.mimetype};base64,${imageBuffer}`;
  
          // const result: any = await uploads(req.file.path, 'profile_pictures');
          const result: any = await uploads(dataUri, 'profile_pictures');
  
          profilePictureUrl = result.url;
          log('profilePictureUrl:', profilePictureUrl);
        }
  
        const userData = {
          firstName,
          lastName,
          email,
          userName,
          number,
          password: hashedPassword,
          verified: false,
          profilePicture: profilePictureUrl,
        };
  
        log("user:", userData)
  
        const newUser = await Users.create(userData);
  
        const expiresIn = '30m';
        const payload = {
          userId: newUser._id,
        };
        const token = JwtHelper.generateToken(payload, expiresIn);
  
        const createdUser = await Users.findById(newUser._id).select(
          '-password -transactionPin -__v'
        );
  
        res.status(201).json({
          error: false,
          message: 'User created successfully',
          data: createdUser,
          token,
        });
  
        try {
          await generateAndSaveOTP(email);
        } catch (error: any) {
          console.error(error);
          throw new Error('Error sending otp: ' + error.message);
        }
      } catch (error: any) {
        next(error);
      }
    }

    
  /**
   * @method createPassCode
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */

  static verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      log(req.body);
      const { email, verificationCode } = req.body;

      if (!email || !verificationCode) {
        throw new Error("Missing fields: Email and OTP required");
      }

      try {
        await verifyEmail(email, verificationCode);
      } catch (error: any) {
        console.error("Error verifying email:", error);
        throw new Error(error.message);
      }

      // console.log("Email verified errorfully.");

      return res
        .status(200)
        .json({ error: false, message: "User verification successful😁" });
    } catch (error: any) {
next(error);    }
  };

  /**
   * @method login
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      log(req.body);
      const { email, password } = req.body;

      if (!email || !password) {
        throw Error("All fields must be filled");
      }

      const user = await UserService.checkThatUserExistWithEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "User does not exist😒" });
      }

      const passwordMatched = await UserService.checkThatPasswordIsValid(email, password);

      if (!passwordMatched) {
        return res
          .status(401)
          .json({ error: true, message: "Incorrect Password 😢" });
      }

      log(user);
      const expiresIn = "30m";
      const payload = {
        userId: user._id,
      };

      const token = JwtHelper.generateToken(payload, expiresIn);

      res.status(200).json({
        error: false,
        data: user,
        token: token,
        message: "login successful",
      });
    } catch (error: any) {
      next(error)
    }
  }

  static async checkIfEmailExistAndSendToken(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // generate reset token
      const token = await generateRandomToken();

      const email = req.body.email;

      // check if user exist
      const userExist = await UserService.checkThatUserExistWithEmail(email);

      if (!userExist) {
        throw new Error(`User with email: ${email} does not exist`);
      }

      // updating the user with otp
      const updateData = {
        verificationOTP: token,
        otpCreationTime: Date.now(),
      };
      await UserService.updateUserById(userExist._id, updateData);

      // sending email verification otp
      const emailSender = new EmailSender(
        process.env.SENDER_EMAIL,
        process.env.SENDER_PASSWORD
      );
      await emailSender.send(
        email,
        "Your OTP Code",
        `Your OTP code is: ${token}`
      );
      return res
        .status(200)
        .json({ error: false, message: `token sent successfully to ${email}` });
    } catch (error: any) {
      log({ error: true, message: error.message });
      res.status(500).json({ error: true, message: error.message });
    }
  }

  /**
   * @method checkIfEmailExistAndSendToken
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */

  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.body.companyEmail, req.body.resetOtp);
      const { email, verificationCode } = req.body;

      const verifyCode = await verifyOTP(email, verificationCode);
      log("verifyCode:", verifyCode);

      if (verifyCode === true) {
        return res.status(200).json({
          error: false,
          data: email,
          message: "OTP verification successful😁",
        });
      }

      return res.status(200).json({
        error: true,
        message: "OTP verification unsuccessful 😢",
      });
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * @method checkIfEmailExistAndSendToken
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */

  static async setPassword(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const updateData = { password: hash };
      // updating user by email
      await UserService.updateUserByEmail(email, updateData);

      res.status(200).json({ error: false });
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * @method resendOtp
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {boolean}
   */

  static async resendOtp(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      // Check if user exists
      const user = await UserService.checkThatUserExistWithEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      // Generate and save a new OTP
      await generateAndSaveOTP(email);

      res
        .status(200)
        .json({ error: false, message: `email successful sent to ${email}` });
    } catch (error: any) {
      next(error)
    }
  }
}

export default AuthController;
