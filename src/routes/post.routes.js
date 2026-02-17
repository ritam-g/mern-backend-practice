const express = require("express");
const {postController, getPostController, patchPostController} = require("../controllers/post.controller");
const multer  = require('multer');
const userVerificaiton = require("../middlewares/auth.middleware");

const postRoute=express.Router()
const storage = multer.memoryStorage() //! this is for memeory storege 
const upload = multer({ storage: storage })


postRoute.post('/',upload.single('image'),userVerificaiton,postController)//! now express can red the form-data file  
postRoute.get('/',userVerificaiton,getPostController)
postRoute.patch('/:id',upload.single('image'),userVerificaiton,patchPostController)
module.exports=postRoute