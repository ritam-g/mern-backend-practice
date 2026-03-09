const express = require('express');
const { registerController, loginController, logoutController, getMeController } = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const testingError = require('../controller/checks.controller');
const { body, validationResult } = require('express-validator');
const practiceConteroller = require('../controller/practice.controller');
const authRoute = express.Router()


authRoute.post("/register", registerController)
authRoute.post("/login", loginController)
authRoute.get("/logout", logoutController)
authRoute.get("/getme", authMiddleware, getMeController)
authRoute.post(
    "/checks",
    [
        body("name").notEmpty().withMessage("name should be filled"),
        body("num").notEmpty().withMessage("num should be filled"),
        body('email').notEmpty().withMessage('email is requried'),
        (req, res, next) => {
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                return next()
            }

            return res.status(400).json({
                errors:errors.array()
            })
        }
    ],
    testingError
)
authRoute.post('/',practiceConteroller)
module.exports = authRoute