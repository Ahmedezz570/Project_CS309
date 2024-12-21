import React, { useState } from "react";
import "./CSS/Register.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (fullName.trim() === "" || email.trim() === "" || password.length < 6) {
      alert("Please fill in all fields. Password must be at least 6 characters.");
      return;
    }
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }), 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Registration successful! ");
          navigate("/");  
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
    <>
    <Navbar />
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
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="form-input"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label"> 
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
<Footer />
    </>
  );
};

export default Register;