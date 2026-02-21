const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "post id is reuquird"],
        ref: 'post'
    },
    username: {
        type: String,
        require: [true, 'username is required'],
        
    }

})
likeSchema.index({post:1,username:1},{unique:true})

module.exports = mongoose.model('like', likeSchema)