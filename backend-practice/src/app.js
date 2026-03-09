const express = require('express');
const authRoute = require('./routes/auth.route');
const cookieParser=require("cookie-parser");
const postRoute = require('./routes/post.route');
const songRoute = require('./routes/song.route');
const handelErr = require('./middleware/err.middleware');
const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res) => {
    return res.status(200).json({
        message:'welcome to our web site'
    })
})

app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)
app.use('/api/song',songRoute)


app.use(handelErr)
module.exports = app