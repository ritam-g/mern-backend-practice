import ImageKit from '@imagekit/nodejs';
import userModel from '../model/user.model.js';
import postModel from '../model/post.model.js';
import AppError from '../utils/AppError.js';

const imagekit = new ImageKit({
   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
});

async function postController(req, res, next) {
   try {
      const { id } = req.user || {};
      const { desc } = req.body;

      if (!id) {
         new AppError("Unauthorized: User not found", 401);
      }

      const user = await userModel.findById(id);
      if (!user) {
         new AppError("Unauthorized: User not found", 401);
      }

      if (!req.file) {
         new AppError("Image is required", 400);
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
         new AppError("Error uploading image to ImageKit", 500);
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
      next(err)
   }
}

export { postController };
