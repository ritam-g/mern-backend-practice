require('dotenv').config()
const { Server } = require('socket.io');
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const { createServer } = require("http")
const { tavily } = require("@tavily/core");
connectToDB()

const httpServer = createServer(app)

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log('client is connected');

    socket.on("message", (data) => {
        io.emit("message", data)
    })

})
// tesing tavily sdk
async function call() {


    const tvly = tavily({ apiKey: process.env.tavily_api_key });
    const response = await tvly.search("what do you think baout india");

    console.log(response);
}
httpServer.listen(3000, () => {
    console.log('server is runnign ');
    call()
})