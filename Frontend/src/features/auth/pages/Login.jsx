import React, { useState } from "react";
import { UseAuth } from "../hooks/useAuth";

function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { handelLogin } = UseAuth()

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        const result = await handelLogin(username, email);
        if (result && result.response) {
            setError(result.response.data?.message || "Login failed.");
        } else if (!result) {
            setSuccess("Welcome back!");
        }
    }

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Login
                </button>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
            </form>
        </div>
    );
}

export default Login;

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif"
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "40px",
        width: "350px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    title: {
        textAlign: "center",
        margin: 0
    },
    input: {
        padding: "12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "14px"
    },
    button: {
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#667eea",
        color: "#ffffff",
        fontSize: "15px",
        cursor: "pointer"
    },
    error: {
        color: "#e74c3c",
        margin: 0,
        fontSize: "13px",
        textAlign: "center"
    },
    success: {
        color: "#27ae60",
        margin: 0,
        fontSize: "13px",
        textAlign: "center"
    }
};