const mongoose = require("mongoose");

const postSchema=new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, 'image url is required']
    },
    user:{
        //user._id this is 
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDemo',
        require:[true,"user id is required for creating an post"]
    }
})

module.exports=mongoose.model('post',postSchema)