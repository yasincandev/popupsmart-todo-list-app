import React from "react";
import "./Login.css";
const Login = (props) => {
  return (
    <div className="login-container">
      <div className="login-form">
        <label className="login-label" htmlFor="username">
          Username
          <input
            type="text"
            name="Username"
            onChange={(event) => props.setUsername(event.target.value)}
            className="login-username"
            value={props.username}
          />
        </label>
        <button className="login-button" onClick={props.handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
