const postModel = require("../model/post.model")
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")
const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    publicKey: 'xxx',
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id'
});

async function postController(req, res) {
    const { caption } = req.body

    //! tekn taken 
    const token = req.cookies.token
    const { id } = jwt.verify(token, process.env.SEC)//! verifying 

    const user = await userModel.findOne({ _id: id })

    if (!user) return res.status(409).json({ message: 'unothorize user' })

    const file = await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),//sending file bugger to inmage kit 
        fileName: 'Experement',
    });
    const post = await postModel.create({
        caption, imgUrl: file.url, user: user._id//! now creting data in db 
    })
    return res.status(201).json({
        message: 'post is created',
        post
    })
}
async function getPostController(req, res) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const { id } = jwt.verify(token, process.env.SEC);

        const posts = await postModel.find({ user: id })

        return res.status(200).json({
            message: "Posts fetched successfully",
            count: posts.length,
            posts
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}
async function patchPostController(req,res) {
    
}


module.exports = { postController, getPostController,patchPostController }