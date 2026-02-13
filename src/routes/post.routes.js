const express = require("express");
const postController = require("../controllers/post.controller");
const multer  = require('multer')

const postRoute=express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


postRoute.post('/',upload.single('image'),postController)

module.exports=postRoute