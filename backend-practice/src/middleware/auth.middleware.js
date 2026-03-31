import jwt from 'jsonwebtoken';
import redis from '../config/cache.js';
import AppError from '../utils/AppError.js';
import app from '../app.js';
async function authMiddleware(req, res, next) {
    const token = req.cookies.token
    try {
        if (!token) {
           throw new AppError("envalid token", 401)
        }
        //NOTE - check token is black list or not 
        const blackList = await redis.get(token)
        if (blackList) {
           throw new AppError("envalid token", 401)
        }//id: user._id, email: user.email 
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (err) {
        console.log(err);
        next(err)

    }
}
export default authMiddleware;
