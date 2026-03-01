const express = require('express');
const { registerController, loginController, logoutController, getMeController } = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const authRoute=express.Router()


authRoute.post("/register",registerController)
authRoute.post("/login",loginController)
authRoute.get("/logout",logoutController)
authRoute.get("/getme",authMiddleware,getMeController)

module.exports=authRoute