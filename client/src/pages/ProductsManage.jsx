import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import dummyProducts from "../dummyDb/allProducts";
import TaxManagement from "../components/TaxManagement ";
import "../styles/Admin.css";

const ProductsManage = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [showPopup, setShowPopup] = useState(false);
  const [showTax, setTaxPopup] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [isavailable, setIsAvailable] = useState(true);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const [image, setImage] = useState("default.png");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setQuantity(selectedProduct.quantity);
      setCategory(selectedProduct.category);
      setIsAvailable(selectedProduct.isavailable);
      setWeeklyAvailability(selectedProduct.weeklyAvailability);
      setImage(selectedProduct.image);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setQuantity(0);
      setCategory("");
      setIsAvailable(true);
      setWeeklyAvailability([]);
      setImage("default.png");
    }
  }, [selectedProduct]);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleOpenTaxPopup = () => {
    setTaxPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setShowPopup(false);
    setTaxPopup(false);
  };

  const handleTaxChange = (e) => {
    setTaxRate(e.target.value);
  };
  const handleTaxUpdate = () => {};
  const handleCreateOrUpdate = (event) => {
    event.preventDefault();
    if (selectedProduct) {
      // Update product
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...selectedProduct,
                name,
                description,
                price: Number(price),
                quantity: Number(quantity),
                category,
                isavailable,
                weeklyAvailability,
                image,
              }
            : product
        )
      );
    } else {
      // Create product
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name,
          description,
          price: Number(price),
          quantity: Number(quantity),
          category,
          isavailable,
          weeklyAvailability,
          image,
        },
      ]);
    }
    handleClosePopup();
  };

  const handleDelete = (id) => {
    // setProducts(products.filter((product) => product.id !== id));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
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
            Create Product
          </button>
          <button
            className="button-admin"
            style={{ marginLeft: "10px" }}
            onClick={() => handleOpenTaxPopup()}
          >
            Update Tax
          </button>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Available</th>
                <th>Weekly Availability</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.isavailable ? "Yes" : "No"}</td>
                  <td>{product.weeklyAvailability}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <button
                      className="button-admin"
                      onClick={() => handleOpenPopup(product)}
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
                      onClick={() => handleDelete(product.id)}
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
            <h2>{selectedProduct ? "Update Product" : "Create Product"}</h2>
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
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              <div>
                <label>
                  Available:
                  <input
                    type="checkbox"
                    checked={isavailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                  />
                </label>
              </div>
              <input
                type="text"
                placeholder="Weekly Availability"
                value={weeklyAvailability}
                onChange={(e) =>
                  setWeeklyAvailability(e.target.value.split(", "))
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <button className="button-admin" type="submit">
                {selectedProduct ? "Update" : "Create"}
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
      {showTax && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleTaxUpdate}>
              <h2 className="h2-admin">Manage Tax Rate</h2>
              <input
                className="input-admin"
                type="number"
                value={taxRate}
                onChange={handleTaxChange}
                placeholder="Tax rate (%)"
              />
              <button className="button-admin">Update Tax Rate</button>
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

export default ProductsManage;
