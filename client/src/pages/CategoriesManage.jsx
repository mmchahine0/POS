import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import categoriesDb from "../dummyDb/categoriesDB";
import "../styles/Admin.css";

const CategoriesManage = () => {
  const [categories, setCategories] = useState(categoriesDb);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(9);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setImg(selectedCategory.img);
    } else {
      setName("");
      setImg("");
    }
  }, [selectedCategory]);

  const handleOpenPopup = (category) => {
    setSelectedCategory(category);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedCategory(null);
    setShowPopup(false);
  };

  const handleCreateOrUpdate = (event) => {
    event.preventDefault();
    if (selectedCategory) {
      // Update category
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id
            ? {
                ...selectedCategory,
                name,
                img,
              }
            : category
        )
      );
    } else {
      // Create category
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name,
          img,
        },
      ]);
    }
    handleClosePopup();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const pageNumbers = [];
  for (let i = 1; i <= categories.length / categoriesPerPage; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar />
      <div className="container-wrapper">
        <div className="container">
          <button
            className="button-admin"
            onClick={() => handleOpenPopup(null)}
          >
            Create Category
          </button>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <img
                      src={category.img}
                      alt={category.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <button
                      className="button-admin"
                      onClick={() => handleOpenPopup(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="button-admin"
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        marginLeft: "5px",
                      }}
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handleClick(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>{selectedCategory ? "Update Category" : "Create Category"}</h2>
            <form onSubmit={handleCreateOrUpdate}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
              <button className="button-admin" type="submit">
                {selectedCategory ? "Update" : "Create"}
              </button>
              <button
                className="button-admin"
                style={{ marginTop: "5px", backgroundColor: "red" }}
                type="button"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManage;
