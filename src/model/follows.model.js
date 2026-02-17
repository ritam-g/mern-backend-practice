const mongoose = require("mongoose");

const followSchema=new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDemo',
        unique:[true,'folower is required']
    },
    follows:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDemo',
        unique:[true,'follow  is required']
    }
},
{timestamps:true})

module.exports=mongoose.model('follow',followSchema)