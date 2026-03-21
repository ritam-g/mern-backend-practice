import { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to backend socket server
const socket = io("http://localhost:3000");

export default function App() {

  // Store the streamed message here
  const [message, setMessage] = useState("");

  useEffect(() => {

    // Listen for each small piece (character)
    socket.on("stream", (chunk) => {

      // Add new character to previous text
      setMessage((prev) => prev + chunk);
    });

    // When backend says "done"
    socket.on("done", () => {
      console.log("Streaming Finished");
    });

    // Cleanup (important to avoid duplicate listeners)
    return () => {
      socket.off("stream");
      socket.off("done");
    };

  }, []);

  return (
    <div>

      {/* Button to start streaming */}
      <button onClick={() => socket.emit("ask")}>
        Start Streaming
      </button>

      {/* Show message + typing cursor */}
      <p>
        {message}
        <span>|</span>
      </p>

    </div>
  );
}