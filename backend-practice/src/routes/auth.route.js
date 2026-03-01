const express = require('express');
const { registerController, loginController, logoutController } = require('../controller/auth.controller');

const authRoute=express.Router()


authRoute.post("/register",registerController)
authRoute.post("/login",loginController)
authRoute.get("/logout",logoutController)

module.exports=authRoute