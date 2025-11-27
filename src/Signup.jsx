// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const usernameTaken = users.some((u) => u.username === username);
    if (usernameTaken) {
      alert("Username already exists.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="signup-page">

      <h1 className="signup-title">SmartTask Tool</h1>
      <p className="signup-subtitle">Collaborate. Track. Achieve.</p>

      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="login-link"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
