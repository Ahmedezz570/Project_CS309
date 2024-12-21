import React, { useState, useEffect } from "react";
import "./CSS/profile.css";
import { useNavigate } from 'react-router-dom'; 
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email")); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (email && token) {
     
      fetch(`http://localhost:4000/user/${email}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            setUserData(data);
            setFormData({
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
            });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [email, token]);

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phoneNumber) {
      alert("Please fill out all fields.");
      return;
    }

    fetch(`http://localhost:4000/user/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Error updating profile");
        } else {
          setUserData(data);
          setIsEditing(false);
        }
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  if (!userData) {
    return (
      <div>
        <div className="lod">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="profile-left">
          <img
            src={userData.image || "R.png"} 
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <div className="profile-right">
          <p>
            <strong>Full Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.phoneNumber}
          </p>
          <div className="edit-profile-btn-container">
            <button onClick={handleEditToggle}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
           
          </div>
          {isEditing && (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;