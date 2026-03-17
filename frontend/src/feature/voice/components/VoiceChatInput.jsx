import React, { useState, useRef } from "react"

const VoiceChatInput = () => {
  const [message, setMessage] = useState("")
  const [listening, setListening] = useState(false)

  const recognitionRef = useRef(null)

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported. Use Chrome.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.lang = "en-US"
    recognition.continuous = false   // IMPORTANT (true sometimes breaks)
    recognition.interimResults = false

    recognition.onstart = () => {
      console.log("Listening started")
      setListening(true)
    }

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      console.log("Result:", text)
      setMessage(text)
    }

    recognition.onerror = (event) => {
      console.error("Error:", event.error)
      alert("Error: " + event.error)
      setListening(false)
    }

    recognition.onend = () => {
      console.log("Listening stopped")
      setListening(false)
    }

    try {
      recognition.start()
    } catch (err) {
      console.log("Already started")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>🎤 Voice Input</h3>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Speak something..."
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button onClick={startListening}>🎤 Start</button>
      <button onClick={stopListening} style={{ marginLeft: "10px" }}>
        🛑 Stop
      </button>

      <p>Status: {listening ? "Listening..." : "Idle"}</p>
    </div>
  )
}

export default VoiceChatInput