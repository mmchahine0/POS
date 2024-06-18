import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:4000/user/login", {
        username,
        password,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.href = "/menu";
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Login failed: Network error or server is down.");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
