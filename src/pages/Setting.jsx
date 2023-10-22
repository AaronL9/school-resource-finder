import React, { useState, useEffect } from "react";
import "../assets/css/setting.css";

const Setting = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-avatar">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img alt="Profile Avatar" className="avatar-image" />
            <input type="file" accept="image/*" id="avatar-upload" />
          </label>
        </div>
        <h2>Profile</h2>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input type="text" id="displayName" />
        </div>
        <div>
          <label htmlFor="studentNumber">Student Number:</label>
          <input type="text" id="studentNumber" />
        </div>
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Setting;
