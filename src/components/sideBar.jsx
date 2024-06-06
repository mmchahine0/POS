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

const Sidebar = () => {
  const handleIconClick = (message) => {
    alert(`${message} clicked`);
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
        <div className="sidebar-icon" onClick={() => handleIconClick("List")}>
          <FontAwesomeIcon icon={faList} />
        </div>
        <div
          className="sidebar-icon"
          onClick={() => handleIconClick("Clipboard Check")}
        >
          <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
        <div
          className="sidebar-icon"
          onClick={() => handleIconClick("Calendar")}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        <div
          className="sidebar-icon"
          onClick={() => handleIconClick("Square Poll Vertical")}
        >
          <FontAwesomeIcon icon={faSquarePollVertical} />
        </div>
        <div
          className="sidebar-icon"
          onClick={() => handleIconClick("Newspaper")}
        >
          <FontAwesomeIcon icon={faNewspaper} />
        </div>
        <div
          className="sidebar-icon"
          onClick={() => handleIconClick("Comments")}
        >
          <FontAwesomeIcon icon={faComments} />
        </div>
      </div>
      <div className="sidebar-buttons">
        <div
          className="sidebar-icon-down"
          onClick={() => handleIconClick("Info")}
        >
          <span style={{ color: "gray" }}>
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
