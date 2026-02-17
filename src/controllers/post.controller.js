const postModel = require("../model/post.model")

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

    const { id } = req.user

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
        const posts = await postModel.find({ user: req.user.id })

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
async function patchPostController(req, res) {
    try {
        const { caption } = req.body;
        const file = req.file;
        const postId = req.params.id;
        const { id } = req.user


        const post = await postModel.findOne({ _id: postId })
        //! post is not ther  
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        //! now check one by one and update 
        if (caption) post.caption = caption
        if (file) {
            const file = await imagekit.files.upload({
                file: req.file.buffer.toString("base64"),//sending file bugger to inmage kit 
                fileName: 'Experement',
            });
            post.imgUrl = file.url//! url is set now 
        }

        await post.save()

        return res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = { postController, getPostController, patchPostController }