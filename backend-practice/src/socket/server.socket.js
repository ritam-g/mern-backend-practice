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

    // When a user connects via socket
    // When user connects → what should I initialize here?

    // When "ask" event comes → how do I start AI generation?

    // Am I waiting for full response? (❌ wrong)
    // How can I start sending before full response is ready? (✅ think streaming)

    // Can I break response into small parts? (char / word)

    // How do I send each small part to frontend?
    // Which socket event should I use? (stream?)

    // After sending one chunk → should I wait a bit? why?

    // How will frontend know response is finished?
    // Do I need a "done" event?

    // Am I sending data continuously or only once? (important)
    io.on("connection", (socket) => {

    // ✅ This runs when a user connects
    console.log("User connected:", socket.id);

    // ✅ "ack" = event name coming from frontend
    // 👉 Frontend MUST call: socket.emit("ack")
    socket.on("ack", async () => {

        // ✅ This is the message you want to stream
        let text = "hello world from server socket"; 

        // ✅ Loop through each character
        for (let char of text) {

            // ✅ Send each character to frontend
            socket.emit("stream", char);

            // ✅ Delay for typing effect
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        // ✅ Tell frontend streaming is finished
        socket.emit("done");
    });

    // ✅ When user disconnects
    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });

});
}


    export function getIO() {
        return io
    }
