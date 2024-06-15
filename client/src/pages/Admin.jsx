import React from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import CategoryManagement from "../components/CategoryManagement";
import ProductManagement from "../components/ProductManagement ";
import UserManagement from "../components/UserManagement ";
import TaxManagement from "../components/TaxManagement ";
import { categories } from "../dummyDb/categoriesDB";
import allProducts from "../dummyDb/allProducts";
import { users } from "../dummyDb/users";

// Dummy data
const dummyOrders = Array.from({ length: 40 }, (_, index) => ({
  _id: `order${index + 1}`,
  createdAt: new Date(2023, 5, index + 1).toISOString(),
  customerInfo: { name: `Customer ${index + 1}` },
  isPaid: index % 2 === 0,
  status: ["pending", "new", "completed", "canceled"][index % 4],
  totalPrice: (index + 1) * 100,
}));

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
