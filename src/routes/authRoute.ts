import { Router } from "express";
import AuthController from "../controllers/authController";
import { Authenticate } from "../middlewares/guard/Authenticate";
import upload from '../middlewares/multer/multer';


const router = Router();

router.post('/', upload.single('profilePicture'), AuthController.createUser);

router.post("/verify-email", AuthController.verifyEmail);

router.post("/login", AuthController.login);

router.post("/checkIfEmailExistAndSendToken", AuthController.checkIfEmailExistAndSendToken);

router.post("/verifyOtp", AuthController.verifyOtp);

router.post("/setPassword", AuthController.setPassword);

router.post("/resendOtp", AuthController.resendOtp)

export default router;
