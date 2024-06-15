import React from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import { users } from "../dummyDb/users";
import UserManagement from "../components/UserManagement ";
import "../styles/Admin.css";

const UsersManage = () => {
  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar />
      <div className="container-wrapper">
        {" "}
        <div className="main-container">
          {" "}
          <UserManagement />
        </div>
      </div>
    </div>
  );
};

export default UsersManage;
