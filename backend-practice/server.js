import 'dotenv/config';
import { Server } from 'socket.io';
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";
import { createServer } from "http";
import { tavily } from "@tavily/core";
import { ChatWithAi } from './src/services/ai.service.js';



// tesing tavily sdk
async function call() {
    await connectToDB()

    ChatWithAi()
}
app.listen(3000, () => {
    console.log('server is runnign ');
    call()
})