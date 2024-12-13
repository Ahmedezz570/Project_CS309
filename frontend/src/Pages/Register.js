import React, { useState } from "react";
import "./CSS/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullname.trim() === "" || username.trim() === "" || password.length < 6) {
      alert("Please fill in all fields. Password must be at least 6 characters.");
      return;
    }

    fetch("https://example.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful! You can now log in.");
          window.location.href = "/login";
        } else {
          alert("Registration failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Full name:
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="form-input"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="form-button">
          Register
        </button>
        <div className="register-links">
          <Link to="/login" className="login-link">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
