import bcrypt from "bcrypt";
import { log } from "console";
import Users from "../models/userModel";
import { ObjectId } from "mongodb";

export class UserService {
  static async checkThatUserExistWithPhoneNumber(number: number) {
    try {
      const user = await Users.findOne({ number });
      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static async checkThatUserExistWithEmail(email: string) {
    try {
      const user = await Users.findOne({ email }).populate("");
      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static async checkThatPasswordIsValid(email: string, password: string) {
    try {
      const user = await Users.findOne({ email });

      if (!user || !user.password) {
        return false;
      }

      const hashedPassword = user.password;
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhoneNumber(phoneNumber: string) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  }

  static async getAllUsers() {
    try {
      const users = Users.find({}).select("-password -verificationOTP");
      return users;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static async getUserById(id: any) {
    try {
      const user = Users.findOne({ _id: new ObjectId(id) }).select("-password -verificationOTP");
      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static async updateUserById(id: any, updateData: object) {
    try {
      const users = await Users.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (!users) throw new Error("No users found🥲");

      const updatedUser = Users.findOne({ _id: new ObjectId(id) }).select("-password -verificationOTP");
      return updatedUser;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static async updateUserByEmail(email: string, updateData: object) {
    try {
      const users = await Users.updateOne({ email }, { $set: updateData });

      if (!users) throw new Error("No users found🥲");

      const updatedUser = await Users.findOne({ email }).select("-password -verificationOTP");

      log(updatedUser);
      return updatedUser;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
