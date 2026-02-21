const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

async function registerController(req, res) {
    const { username, email } = req.body
    
    //NOTE - checks
    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (user){ return res.status(409).json({
        message: 'user already exieste'
    })}
    const createdUser = await userModel.create({ username, email })
    const token = jwt.sign({ id: createdUser._id, email: createdUser.email,username:username }, process.env.SEC)

    res.cookie('token',token)

    res.status(201).json({
        message:'user created',
        createdUser
    })

}
async function loginController(req,res) {
    const {username,email}=req.body
    const user=await userModel.findOne({
        $and:[{username},{email}]
    })
    if(!user){return res.status(401).json({
        message:'no user found'
    })}
    const token = jwt.sign({ id: user._id, email: user.email ,username:username}, process.env.SEC)
    res.cookie('token',token)
    return res.status(200).json({
        message:'welcome back'
    })

}
module.exports={registerController,loginController}