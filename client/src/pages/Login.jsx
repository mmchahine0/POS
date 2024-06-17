import React from "react";
import { useState } from "react";
import users from "../dummyDb/users";
import "../styles/Login.css";
import { Navigate } from "react-router-dom";
//import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getUser = () => {
    const user = {
      id: 2,
      name: "Jane Doe",
      username: "jane",
      password: "jane123",
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/menu";
  };
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      return setError('All fields are required');
    }

    try {
      const response = await axios.post('/api/login', { username, password });
      const { user } = response.data;
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/menu';
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };*/
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" onSubmit={getUser(username, password)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default Login;
