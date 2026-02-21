const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('server is connected');
    
}
module.exports=connectDB