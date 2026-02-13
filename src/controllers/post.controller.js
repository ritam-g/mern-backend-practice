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

   const file= await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),//sending file bugger to inmage kit 
        fileName: 'Experement',
    });
    const post = await postModel.create({
        caption, imgUrl:file.url, user: user._id//! now creting data in db 
    })
    return res.status(201).json({
        message:'post is created',
        post
    })
}

module.exports = postController