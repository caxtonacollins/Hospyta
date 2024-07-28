import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

interface CloudinaryParams {
   folder?: string;
   resource_type?: string;
   public_id?: (req: any, file: any) => string;
}

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
     folder: "Post_images",
     resource_type: "auto",
     public_id: (req, file) => file.originalname.split(".")[0].trim(), // use file name as the public_id
   } as CloudinaryParams,
 });
 
 const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } }); //limits of file size 1m

 export default upload