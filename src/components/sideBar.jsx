import React from "react";
import "../styles/sideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faRightFromBracket,
  faList,
  faClipboardCheck,
  faCalendar,
  faSquarePollVertical,
  faNewspaper,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleIconClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="Icon" />
      </div>
      <div className="sidebar-icons">
        <div
          className={`sidebar-icon ${
            location.pathname === "/menu" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/menu")}
        >
          <FontAwesomeIcon icon={faList} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/clipboard-check" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/clipboard-check")}
        >
          <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/calendar" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/calendar")}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/square-poll-vertical" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/square-poll-vertical")}
        >
          <FontAwesomeIcon icon={faSquarePollVertical} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/newspaper" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/newspaper")}
        >
          <FontAwesomeIcon icon={faNewspaper} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/comments" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/comments")}
        >
          <FontAwesomeIcon icon={faComments} />
        </div>
      </div>
      <div className="sidebar-buttons">
        <div
          className={`sidebar-icon-down ${
            location.pathname === "/info" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/info")}
        >
          <span>
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>
        <div className="sidebar-icon-down" onClick={() => handleLogout()}>
          <span style={{ color: "red" }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
