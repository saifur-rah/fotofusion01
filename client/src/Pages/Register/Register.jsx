import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState(false)
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login")
    } catch (err) {
      setError(true)
    }
  };
  return (
    <div className="register">
      <div className="registerContainer">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={submitHandler}>
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="registerButton">Register</button>
        {error && <span className="authError">Something went wrong!</span>}
        </form>
        <button className="loginRegisterButton">
          <Link to="/login" className="link">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
