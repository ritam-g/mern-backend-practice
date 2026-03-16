import 'dotenv/config';
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";
import { ChatWithAi } from './src/services/ai.service.js';
import { createServer } from 'http';
import { initSocket } from './src/socket/server.socket.js'
const httpServer = createServer(app);

initSocket(httpServer)
// tesing tavily sdk
async function call() {
    await connectToDB()

    ChatWithAi()
}
httpServer.listen(3000, () => {
    console.log('server is runnign ');
    call()
})