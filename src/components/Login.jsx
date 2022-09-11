import React from "react";

import "./Login.css";
const Login = ({ username, setUsername, handleLogin }) => {
  return (
    <div className="login-container">
      <div className="login-form">
        <label className="login-label" htmlFor="username">
          Username
          <input
            type="text"
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
            className="login-username"
            value={username}
          />
        </label>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
