const jwt = require("jsonwebtoken")
async function userVerificaiton(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    let decode = null
    try {
        decode = jwt.verify(token, process.env.SEC);
    } catch (err) {
        return res.status(401).json({ message: 'user is not found ', status: 'faild' })
    }
    req.user=decode 
    next()
}

module.exports=userVerificaiton