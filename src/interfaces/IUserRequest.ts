import { Request } from "express";
import { IUser } from "../models/userModel";

/**
 * @interface IUserRequest
 */
export interface IUserRequest extends Request {
    user?: IUser;
}