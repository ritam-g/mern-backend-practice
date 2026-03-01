const jwt = require('jsonwebtoken');
const redis = require('../config/cache');
async function authMiddleware(req, res, next) {
    const token = req.cookies.token
    try {

        //NOTE - check token is black list or not 
        const blackList = await redis.get(token)
        if (blackList) {
            return res.status(401).json({
                message: "envalid token"
            })
        }//id: user._id, email: user.email 
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            mesagge: "something went wrong "
        })

    }
}
module.exports = authMiddleware