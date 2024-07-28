import mongoose, { Schema, Document, model, Types } from 'mongoose';

interface IImage {
  fileURL: string;
  cloudinaryId: string;
}

// Define the IPost interface extending Document
export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  content: string;
  image?: IImage[];
  category: string;
  upvotes: string[];
  downvotes: string[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  title: string;
  viewCount: number;
}

// Define the post schema
const postSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    content: { type: String, required: true },
    image: [{ type: Object }],
    category: {
      type: String,
      enum: ['Kidney', 'Headache', 'Stomachache', 'Leg-Pain', 'Malaria'],
      required: true,
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create and export the Post model
const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
