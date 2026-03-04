const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ['happy', 'sad', 'rock']
        },
        default: 'happy'
    }
})
module.exports=mongoose.model('song',songSchema)