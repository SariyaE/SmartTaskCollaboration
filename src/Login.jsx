// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      toast.error("Invalid username or password");
      return;
    }

    setUser({ username: found.username, email: found.email, role: "member" });
    toast.success("Login successful!");
    navigate("/projects");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#222",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <ToastContainer position="top-right" autoClose={2500} />

      {/* 🌈 TITLE ABOVE THE BOX */}
      <h1
        style={{
          marginBottom: 20,
          fontSize: "2rem",
          background: "linear-gradient(90deg, #00c6ff, #ff6ec4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        Smart Task Tool
      </h1>

      <form
        onSubmit={handleLogin}
        style={{
          width: 360,
          background: "#333",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Login</h2>

        <label style={{ display: "block", marginBottom: 8 }}>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <button
          type="submit"
          style={{
            background: "#0af",
            color: "white",
            padding: "10px 14px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          Login
        </button>

        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              background: "transparent",
              color: "#0af",
              border: "none",
              cursor: "pointer",
            }}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
