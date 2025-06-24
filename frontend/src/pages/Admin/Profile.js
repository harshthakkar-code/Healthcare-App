import React, { useState } from "react";
import "./Profile.css";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>Profile</h2>
        <p>Dashboard / Profile</p>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="Admin"
            className="profile-avatar"
          />
          <div>
            <h3>Ryan Taylor</h3>
            <p className="email">ryantaylor@admin.com</p>
            <p className="location">📍 Florida, United States</p>
            <p className="desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <button className="edit-button">Edit</button>
        </div>

        <div className="tab-row">
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={activeTab === "password" ? "active" : ""}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>
      </div>

      {activeTab === "about" && (
        <div className="details-card">
          <div className="details-header">
            <h4>Personal Details</h4>
            <button className="edit-text">
              <FaEdit /> Edit
            </button>
          </div>
          <div className="details-grid">
            <div>
              <strong>Name</strong>
              <p>John Doe</p>
            </div>
            <div>
              <strong>Date of Birth</strong>
              <p>24 Jul 1983</p>
            </div>
            <div>
              <strong>Email ID</strong>
              <p>johndoe@example.com</p>
            </div>
            <div>
              <strong>Mobile</strong>
              <p>305-310-5857</p>
            </div>
            <div>
              <strong>Address</strong>
              <p>
                4663 Agriculture Lane,<br />
                Miami, Florida - 33165,<br />
                United States.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "password" && (
        <div className="details-card">
          <h4>Change Password</h4>
          <p>Implement password change form here...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
