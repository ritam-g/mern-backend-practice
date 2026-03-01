const ImageKit = require('@imagekit/nodejs');
const userModel = require('../model/user.model');
const postModel = require('../model/post.model');

const imagekit = new ImageKit({
   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
});

async function postController(req, res) {
   try {
      const { id } = req.user || {};
      const { desc } = req.body;

      if (!id) {
         return res.status(401).json({ message: "Unauthorized: Missing user token data" });
      }

      const user = await userModel.findById(id);
      if (!user) {
         return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      if (!req.file) {
         return res.status(400).json({ message: "Image is required" });
      }

      let file = null;
      try {
         file = await imagekit.files.upload({
            file: req.file.buffer.toString("base64"),
            fileName: `post_${Date.now()}`,
            folder: "/testing/posts"
         });
      } catch (uploadErr) {
         console.error("ImageKit Error:", uploadErr);
         return res.status(500).json({ message: "Failed to upload image" });
      }
      const post = await postModel.create({
         desc,
         img: file.url,
         user: id
      });

      return res.status(201).json({
         message: 'Post created successfully',
         post
      });
   } catch (err) {
      console.error("Post creation error:", err);
      return res.status(500).json({ message: "Something went wrong while creating post" });
   }
}

module.exports = { postController };
