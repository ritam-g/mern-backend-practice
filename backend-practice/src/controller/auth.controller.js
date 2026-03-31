import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import redis from "../config/cache.js";
import AppError from "../utils/AppError.js";
/**
 * @access evryone 
 * 
 */
async function registerController(req, res) {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists
        const userExist = await userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (userExist) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}
/**
 * 
 * 
 */
async function loginController(req, res, next) {
    try {
        const { email, username, password } = req.body;
        const user = await userModel.findOne({
            $or: [{ email }, { username }]
        }).select("+password")

        if (!user) {
            throw new AppError("user is not found", 404);

        }
        //NOTE - password verificaiton

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new AppError("Invalid credentials", 401);
        }

        //NOTE - token created
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY)
        res.cookie('token', token)
        return res.status(200).json({
            message: 'loing in sucess',
        })
    } catch (err) {
        next(err)
    }
}
/**
 * 
 * 
 */
async function logoutController(req, res) {

    try {
        const { token } = req.cookies
        await redis.set(token, Date.now().toString())
        return res.status(201).json({
            message: "logout sucessfully"
        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * 
 * 
 */
async function getMeController(req, res) {
    try {
        const { id } = req.user
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(401).json({
                message: 'no user found'
            })
        }
        return res.status(200).json({
            message: 'your details',
            user
        })
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: 'something went wrong'
        })
    }
}
export { getMeController, logoutController, registerController, loginController };
