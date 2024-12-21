import React, { useState } from "react";
import "./CSS/Register.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();
  
  const validatePassword = (password) => {
    const validationRules = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      maxLength: 50,
    };

    const errors = [];
    if (password.length < validationRules.minLength) {
      errors.push(`At least ${validationRules.minLength} characters long`);
    }
    if (password.length > validationRules.maxLength) {
      errors.push(`Cannot exceed ${validationRules.maxLength} characters`);
    }
    if ((password.match(/[a-z]/g) || []).length < validationRules.minLowercase) {
      errors.push("At least one lowercase letter");
    }
    if ((password.match(/[A-Z]/g) || []).length < validationRules.minUppercase) {
      errors.push("At least one uppercase letter");
    }
    if ((password.match(/[0-9]/g) || []).length < validationRules.minNumbers) {
      errors.push("At least one number");
    }
    if (/^[0-9]*$/.test(password)) {
      errors.push("Cannot contain only numbers");
    }
    if (/^[a-zA-Z]*$/.test(password)) {
      errors.push("Cannot contain only letters");
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (fullName.trim() === "" || email.trim() === "" ) {
      alert("Please fill in all fields.");
      return;
    }
    if (password!== confirmPassword) {
      alert("Passwords do not match.");
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
            Full name:<span className="required-star">*</span>
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
            Email:<span className="required-star">*</span>
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
            Password:<span className="required-star">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            className="form-input"
            autoComplete="off"
          />
            {passwordErrors.length > 0 && (
              <ul className="password-requirements">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}          
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password: <span className="required-star">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="confirm-password-input"
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