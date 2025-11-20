// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.some((u) => u.username === username)) {
      toast.error("Username already exists");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser({ username, email, role: "member" });
    toast.success("Account created successfully!");
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
        onSubmit={handleSignup}
        style={{
          width: 360,
          background: "#333",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Create Account</h2>

        <label style={{ display: "block", marginBottom: 8 }}>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
