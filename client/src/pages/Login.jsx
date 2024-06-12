import React from "react";
import { useState } from "react";
import getUser from "../dummyDb/users";
import "../styles/Login.css";
//import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    if (!username || !password) {
      return setError("All fileds are required");
    }
    const response = getUser(username, password);
    response
      .then((user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/menu";
      })
      .catch((err) => {
        setError(err);
      });
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
      <form className="form-container" onSubmit={handleSubmit}>
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
