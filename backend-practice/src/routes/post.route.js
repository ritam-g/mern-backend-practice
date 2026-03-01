const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const multer=require("multer");
const { postController } = require('../controller/post.controller');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postRoute=express.Router()

postRoute.post("/post",upload.single('img'),authMiddleware,postController)

module.exports=postRoute
