import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    socket.on("stream", (chunk) => {
      setMessage((prev) => prev + chunk);
    });

    socket.on("done", () => {
      console.log("Streaming Finished");
    });

    return () => {
      socket.off("stream");
      socket.off("done");
    };

  }, []);

  return (
    <div>

      {/* ✅ FIXED BUTTON */}
      <button onClick={() => {
        setMessage("");        // clear previous text
        socket.emit("ack");    // ✅ send event
      }}>
        Start Streaming
      </button>

      <p>
        {message}
        <span>|</span>
      </p>

    </div>
  );
}