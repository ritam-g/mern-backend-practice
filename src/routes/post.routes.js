const express = require("express");
const {postController, getPostController, patchPostController, getSinglePost, likePostController, unlikePostController} = require("../controllers/post.controller");
const multer  = require('multer');
const userVerificaiton = require("../middlewares/auth.middleware");

const postRoute=express.Router()
const storage = multer.memoryStorage() //! this is for memeory storege 
const upload = multer({ storage: storage })


postRoute.post('/',upload.single('image'),userVerificaiton,postController)//! now express can red the form-data file
/**
 * user wil get all post agter login  */  
postRoute.get('/',userVerificaiton,getPostController)
/** this is for post updation  */
postRoute.patch('/:id',upload.single('image'),userVerificaiton,patchPostController)

/**singl post  */
postRoute.get('/:postid',userVerificaiton,getSinglePost)

/**like feture  */
postRoute.post('/like/:postid',userVerificaiton,likePostController)

/**unlike feture  */

postRoute.patch('/unlike/:postid',userVerificaiton,unlikePostController)

module.exports=postRoute