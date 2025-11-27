// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const usernameTaken = users.some((u) => u.username === username);

    if (usernameTaken) {
      alert("Username already exists. Try another one.");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/");
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
      {/* TITLE ABOVE THE BOX */}
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

      {/* SIGNUP BOX */}
      <form
        onSubmit={handleSignup}
        style={{
          width: 360,
          background: "#333",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Create Account</h2>

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
          Sign Up
        </button>

        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              color: "#0af",
              border: "none",
              cursor: "pointer",
            }}
          >
            Already have an account? Log in
          </button>
        </div>
      </form>
    </div>
  );
}

