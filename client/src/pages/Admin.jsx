import React from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import CategoryManagement from "../components/CategoryManagement";
import ProductManagement from "../components/ProductManagement ";
import UserManagement from "../components/UserManagement ";
import TaxManagement from "../components/TaxManagement ";

const Admin = () => {
  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar />
      <div className="container-wrapper">
        {" "}
        <div className="main-container">
          <div className="admin-features">
            <CategoryManagement />
            <ProductManagement />
            <UserManagement />
            <TaxManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
