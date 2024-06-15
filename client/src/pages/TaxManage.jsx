import React from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import TaxManagement from "../components/TaxManagement ";
import "../styles/Admin.css";

const TaxManage = () => {
  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar />
      <div className="container-wrapper">
        {" "}
        <div className="main-container">
          {" "}
          <TaxManagement />
        </div>
      </div>
    </div>
  );
};

export default TaxManage;
