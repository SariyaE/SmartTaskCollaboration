// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
    <div className="login-page">
      {/* Title ABOVE the card */}
      <h1 className="login-title">SmartTask</h1>
      <p className="login-subtitle">Welcome back — log in to continue</p>

      {/* White login card */}
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-header">Login</h2>

        <label className="login-label">
          Username
          <input
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </label>

        <label className="login-label">
          Password
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>

        <button className="login-button" type="submit">
          Log In
        </button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
