import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import multer from "multer";
import { postController } from '../controller/post.controller.js';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postRoute = express.Router()

postRoute.post("/post", upload.single('img'), authMiddleware, postController)

export default postRoute;
