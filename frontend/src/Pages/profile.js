import React, { useState, useEffect } from "react";
import "./CSS/profile.css";
// import Navbar from '../Components/NavBar/Navbar';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("TryObjecty5m1i545@gggmail.com"); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    image: "",
  });

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:4000/user/${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            setUserData(data);
            setFormData({
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
              image: data.image,
            });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [email]);

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/user/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    return <div>
        {/* <Navbar className="navo"/>*/}
        <div className="lod"> Loading...</div>
        </div>
  }

  return (
    <div className="profile-container">
                {/* <Navbar className="navo"/> */}
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="profile-left">
          {userData.image && (
            <img
              src="R.png"
              alt="Pro"
              className="profile-picture"
            />
          )}
        </div>
        <div className="profile-right">
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
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
              <div>
                <label>Profile Picture URL:</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
