import express from 'express';
import authRoute from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import postRoute from './routes/post.route.js';
import songRoute from './routes/song.route.js';
import handelErr from './middleware/err.middleware.js';
const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'welcome to our web site'
    })
})

app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/song', songRoute)


app.use(handelErr)

export default app;
