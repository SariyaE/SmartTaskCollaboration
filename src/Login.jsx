import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("This is only UI — backend not connected yet.");
  };

  return (
    <div className="login-page">
      <h1 className="title">SmartTask Tool</h1>
      <p className="subtitle">Collaborate. Track. Achieve.</p>

      <form className="login-card" onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
