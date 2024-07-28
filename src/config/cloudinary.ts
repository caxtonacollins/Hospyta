import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploads = (file: string, folder: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result?.url,
          id: result?.public_id,
        });
      }
    );
  });
};

export default cloudinary;