// Login.jsx
import "./Login.css";    
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://kanban-app-casf.onrender.com/api/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      if (!response.ok) {
        const err = await response.json();
        alert(err.detail || "Login failed.");
        return;
      }

      const data = await response.json();

      // Save token + user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update state so the app knows the user is logged in
      setUser(data.user);

      navigate("/projects");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong connecting to the server.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">Smart Task Tool</h1>

      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log In</button>

        <div className="signup-link">
          <button type="button" onClick={() => navigate("/signup")}>
            Don’t have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
