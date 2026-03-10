require('dotenv').config()
const { Server } = require('socket.io');
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const { createServer } = require("http")
connectToDB()

const httpServer = createServer(app)

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log('client is connected');

    socket.on("message", (data) => {
        io.emit("message", data)
    })

})

httpServer.listen(3000,()=>{
    console.log('server is runnign ');
    
})