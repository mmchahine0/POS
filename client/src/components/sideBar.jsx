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

  const handleIconClick = (theRoute) => {
    navigate(theRoute);
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
            location.pathname === "/orders" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/orders")}
        >
          <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/usersManage" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/usersManage")}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/categoriesManage" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/categoriesManage")}
        >
          <FontAwesomeIcon icon={faSquarePollVertical} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/productsManage" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/productsManage")}
        >
          <FontAwesomeIcon icon={faNewspaper} />
        </div>
        <div
          className={`sidebar-icon ${
            location.pathname === "/taxManage" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("/taxManage")}
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
