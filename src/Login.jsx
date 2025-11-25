import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // --- TEMPORARY MOCK LOGIN (no backend needed) ---
    if (!username.trim() || !password.trim()) {
      alert("Please enter a username and password.");
      return;
    }

    // You will remove this once backend connects
    const mockUser = {
      username: username,
      role: "user",
    };

    setUser(mockUser);
    navigate("/projects"); // move to projects page
  };

  return (
    <div className="login-page">
      <h1 className="login-title">SmartTask Tool</h1>
      <p className="login-subtitle">Collaborate. Track. Achieve.</p>

      <div className="login-card">
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a>Sign up</a>
        </p>
      </div>
    </div>
  );
}
