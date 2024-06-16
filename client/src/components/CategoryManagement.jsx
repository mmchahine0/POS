import React, { useState } from "react";
import "../styles/Admin.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    setCategories([...categories, { name: newCategory }]);
    setNewCategory("");
  };

  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleEditCategory = (index, newName) => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, name: newName } : category
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="category-management">
      <h2 className="h2-admin">Manage Categories</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Add new category"
        className="input-admin"
      />
      <button className="button-admin" onClick={handleAddCategory}>
        Add Category
      </button>
      <ul className="ul-admin">
        {categories.map((category, index) => (
          <li className="li-admin" key={index}>
            <input
              className="input-admin"
              type="text"
              value={category.name}
              onChange={(e) => handleEditCategory(index, e.target.value)}
            />
            <button
              className="button-admin"
              onClick={() => handleDeleteCategory(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
