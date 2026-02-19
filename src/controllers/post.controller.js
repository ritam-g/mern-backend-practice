const { json } = require("express");
const likeModel = require("../model/like.model");
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

async function getSinglePost(req, res) {
    try {


        const user = await userModel.findById(req.user.id)
        if (!user) return res.status(401).json({ message: "unauthorized user" })
        const post = await postModel.findById(req.params.postid)
        if (!post) return res.status(401).json({ message: "post not found" })

        return res.status(200).json({
            message: 'post is found', statusbar: 'sucess', post
        })
    } catch (err) {
        console.log(err.message, err);

        return res.status(404).json({
            message: 'something went wrong '
        })
    }
}
async function likePostController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const post = await postModel.findById(req.params.postid);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if already liked
        const alreadyLiked = await likeModel.findOne({
            post: req.params.postid,
            username: req.user.username
        });

        if (alreadyLiked) {
            return res.status(400).json({
                message: "You already liked this post"
            });
        }

        const likePost = await likeModel.create({
            post: req.params.postid,
            username: req.user.username
        });

        return res.status(201).json({
            message: 'You successfully liked the post',
            likePost
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

async function unlikePostController(req, res) {
    try {
        const postId = req.params.postid;
        const username = req.user.username;

        const likePost = await likeModel.findOne({
            post: postId,
            username: username
        });

        if (!likePost) {
            return res.status(400).json({
                message: 'Please like the post first'
            });
        }

        await likeModel.findOneAndDelete({
            post: postId,
            username: username
        });

        return res.status(200).json({
            message: 'You unliked the post'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}


module.exports = { unlikePostController, likePostController, postController, getPostController, patchPostController, getSinglePost }