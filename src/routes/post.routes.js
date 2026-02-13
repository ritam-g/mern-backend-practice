const express = require("express");
const postController = require("../controllers/post.controller");
const multer  = require('multer')

const postRoute=express.Router()
const storage = multer.memoryStorage() //! this is for memeory storege 
const upload = multer({ storage: storage })


postRoute.post('/',upload.single('image'),postController)//! now express can red the form-data file  

module.exports=postRoute