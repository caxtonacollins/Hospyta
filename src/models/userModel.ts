import mongoose, { Schema, Document, ObjectId } from 'mongoose';

// Define the IUser interface extending Document
export interface IUser extends Document {
  _id: string;
  userName: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  number: number;
  verified: boolean;
  verificationOTP: number;
  transactionPin?: string;
  otpCreationTime?: Date;
  role: string;
  referral?: string;
}

// Create the User schema
// some of the fields might not be required

const UserSchema: Schema = new Schema({
  profilePicture: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationOTP: { type: Number },
  otpCreationTime: { type: Date },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const Users = mongoose.model<IUser>('User', UserSchema);
export default Users;
