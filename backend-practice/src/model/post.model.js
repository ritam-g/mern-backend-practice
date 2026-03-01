const mongoose = require('mongoose');

const postSchema=await mongoose.Schema({
    img:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    desc:{
        type:String
    }
},{ timestamps: true })
module.exports=mongoose.model('post',postSchema)