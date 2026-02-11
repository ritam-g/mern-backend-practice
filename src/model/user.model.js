const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'already exieste']
    },
    email:{
        type:String,
        unique:[true,'email alredy exieste']
    }
})

module.exports=mongoose.model('userDemo',userSchema)