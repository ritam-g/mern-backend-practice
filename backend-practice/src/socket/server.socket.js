import { Server } from "socket.io";
let io
 
export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    console.log("server is connected properly");
     
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);
    })


}

 
export function getIO() {
    return io
}
