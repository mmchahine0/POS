import React from "react";
import "../styles/topBar.css";

const TopBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="top-bar">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Your Menu Here"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="profile-container">
        <img
          src="https://picsum.photos/200/200"
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <div className="profile-name">John Doe</div>
          <div className="profile-description">Admin</div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
