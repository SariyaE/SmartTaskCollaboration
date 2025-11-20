// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      alert("Invalid username or password");
      return;
    }

    setUser(foundUser);
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
      {/* TITLE OUTSIDE AND ABOVE THE BOX */}
      <h1
        style={{
          marginBottom: 30,
          fontSize: "2.2rem",
          background: "linear-gradient(to right, #00d4ff, #7a5cff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        Smart Task Tool
      </h1>

      {/* LOGIN BOX */}
      <form
        onSubmit={handleLogin}
        style={{
          width: 360,
          background: "#333",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Login</h2>

        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 6,
              marginBottom: 10,
            }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 6,
              marginBottom: 10,
            }}
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
          Log In
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
