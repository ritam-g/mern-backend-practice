import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    desc: {
        type: String
    }
}, { timestamps: true })
export default mongoose.model('post', postSchema);
