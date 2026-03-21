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
        console.log("User connected:", socket.id);

        // ✅ Step 1: Listen from frontend
        socket.on("ask", async (data) => {
            console.log("User asked:", data);

            const text = "Hello this is from backend socket server to frontend";

            // ✅ Step 2: stream response character by character
            for (let char of text) {
                socket.emit("stream", char);

                // typing delay
                await new Promise((resolve) => setTimeout(resolve, 30));
            }

            // ✅ Step 3: tell frontend streaming is finished
            socket.emit("done");
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

}


export function getIO() {
    return io
}
