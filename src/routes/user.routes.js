const express = require("express");
const userVerificaiton = require("../middlewares/auth.middleware");
const { userSendRequest, userResponseController } = require("../controllers/user.controller");

const userRoute=express.Router()
/** USER WILL FOLLOW TO OTHER USER  */
userRoute.post('/follow/:username',userVerificaiton,userSendRequest)
userRoute.patch('/userresponse/:followid',userVerificaiton,userResponseController)

module.exports=userRoute