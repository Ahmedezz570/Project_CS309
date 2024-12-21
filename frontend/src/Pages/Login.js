import React, { useState } from 'react';
import './CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Footer from '../Components/Footer/Footer';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token); 
          localStorage.setItem("email", email); 
          const isAdmin = data.isAdmin;
          if (isAdmin) {
            navigate("/admin"); 
          }
         else {
  
          navigate("/"); }
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
    <div className="logincontainer">
      <h1 className="logintitle">Login</h1>
      <form className="loginform" onSubmit={handleSubmit}>
        <div className="formgroup">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"  
            id="email"
            name="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="loginbutton">Login</button>
        <div className="loginlinks">
          <Link to="/register" >Don't have an account?</Link>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};
export default Login;