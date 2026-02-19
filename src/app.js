const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter = require('./routes/auth.routes');
const postRoute = require('./routes/post.routes');
const userRoute = require('./routes/user.routes');

const app=express()

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authRouter)
app.use('/api/post',postRoute)
app.use('/api',userRoute)
module.exports=app