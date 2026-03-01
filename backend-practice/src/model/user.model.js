const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true })
userSchema.index({ email: 1, username: 1 }, { unique: true })
module.exports = mongoose.model("user", userSchema)