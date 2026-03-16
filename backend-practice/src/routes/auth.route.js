import express from 'express';
import { registerController, loginController, logoutController, getMeController } from '../controller/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import testingError from '../controller/checks.controller.js';
import { body, validationResult } from 'express-validator';
import practiceConteroller from '../controller/practice.controller.js';
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
                errors: errors.array()
            })
        }
    ],
    testingError
)
authRoute.post('/', practiceConteroller)
export default authRoute;
