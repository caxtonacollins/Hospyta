import express from 'express';
import userRouter from './userRoute';
import postRouter from './postRoute';
import authRouter from './authRoute'
import commentRouter from './commentRoute'

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter)

export default router;
