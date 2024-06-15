import React from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import { categories } from "../dummyDb/categoriesDB";
import CategoryManagement from "../components/CategoryManagement";
import "../styles/Admin.css";

const CategoriesManage = () => {
  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar />
      <div className="container-wrapper">
        {" "}
        <div className="main-container">
          <CategoryManagement />
        </div>
      </div>
    </div>
  );
};

export default CategoriesManage;
