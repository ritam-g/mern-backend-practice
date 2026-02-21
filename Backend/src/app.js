const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter = require('./routes/auth.routes');
const postRoute = require('./routes/post.routes');
const userRoute = require('./routes/user.routes');
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true
  }))


app.use('/api/auth',authRouter)
app.use('/api/post',postRoute)
app.use('/api',userRoute)
module.exports=app