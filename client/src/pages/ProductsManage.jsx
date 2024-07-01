import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import "../styles/Admin.css";

const ProductsManage = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showTax, setTaxPopup] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [tax, setTax] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [isavailable, setIsAvailable] = useState(false);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/category/getAll"
        );
        const categoriesArray = response.data.data;
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/tax/get");
        const TaxData = response.data.data;
        setTax(TaxData[0]);
        setTaxRate(TaxData[0].taxPrice);
      } catch (error) {
        console.error("Error fetching Tax:", error);
      }
    };
    fetchTax();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/product/getAll");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setQuantity(selectedProduct.quantity);
      setCategory(selectedProduct.category._id);
      setIsAvailable(selectedProduct.isavailable);
      setWeeklyAvailability(selectedProduct.weeklyAvailability);
      setImage(selectedProduct.image);
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setIsAvailable(false);
    setWeeklyAvailability([]);
    setImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null); // Reset image state if no file selected
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleShowDeleteConfirmation = (product) => {
    setProductId(product);
    setShowDeleteConfirmation(true);
  };
  const handleOpenTaxPopup = () => {
    setTaxPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setShowPopup(false);
    setTaxPopup(false);
    setShowDeleteConfirmation(false);
  };

  const handleTaxChange = (e) => {
    setTaxRate(e.target.value);
  };

  const handleCreateOrUpdateTax = async (event) => {
    event.preventDefault();
    try {
      const response = tax
        ? await axios.put(`http://127.0.0.1:4000/tax/update/${tax._id}`, {
            taxPrice: taxRate,
          })
        : await axios.post("http://127.0.0.1:4000/tax/create", {
            taxPrice: taxRate,
          });

      setTax(response.data.data);
      handleClosePopup();
    } catch (error) {
      console.error("Error creating/updating tax:", error);
    }
  };

  const handleCreateOrUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("quantity", Number(quantity));
    formData.append("category", category);
    formData.append("isavailable", isavailable);
    weeklyAvailability.forEach((day) => {
      formData.append("weeklyAvailability", day); // Append each day as a separate form data entry
    });
    if (image) {
      formData.append("image", image);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = selectedProduct
        ? await axios.patch(
            `http://127.0.0.1:4000/product/update/${selectedProduct._id}`,
            formData,
            config
          )
        : await axios.post(
            "http://127.0.0.1:4000/product/create",
            formData,
            config
          );

      setProducts(
        products.map((product) =>
          product._id === response.data.data._id ? response.data.data : product
        )
      );
      fetchProducts(); // Refresh the list after update
      resetForm();
      handleClosePopup();
    } catch (error) {
      console.error("Error creating/updating product:", error);
    }
  };

  const handleDelete = async () => {
    const id = productId;
    try {
      await axios.delete(`http://127.0.0.1:4000/product/delete/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDayChange = (day) => {
    setWeeklyAvailability((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day); // Remove the day if it's already included
      } else {
        return [...prev, day]; // Add the day if it's not included
      }
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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
            onClick={handleOpenTaxPopup}
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
                <tr key={product._id}>
                  <td className="scrollable-cell">{product._id}</td>
                  <td>{product.name}</td>
                  <td className="scrollable-cell">{product.description}</td>
                  <td>{product.price.toFixed(2)}</td>{" "}
                  <td>{product.quantity}</td>
                  <td>
                    {product.category ? product.category.name : "No Category"}
                  </td>
                  <td>{product.isavailable ? "Yes" : "No"}</td>
                  <td className="scrollable-cell">
                    {product.weeklyAvailability.join(", ")}
                  </td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "50px", height: "50px" }}
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
                      onClick={() => handleShowDeleteConfirmation(product._id)}
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
              <select
                className="select-admin"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div style={{ marginLeft: "5px" }}>
                <label
                  className="p-admin"
                  style={{ marginRight: "5px", marginBottom: "10px" }}
                >
                  Available:
                </label>
                <input
                  type="checkbox"
                  checked={isavailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                />
              </div>
              <div style={{ marginBottom: "10px", marginLeft: "5px" }}>
                <label className="p-admin" style={{ marginRight: "5px" }}>
                  Weekly Availability:
                </label>
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      style={{ margin: "5px" }}
                      type="checkbox"
                      checked={weeklyAvailability.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />
                    <label>{day}</label>
                  </div>
                ))}
              </div>
              <input type="file" onChange={handleImageChange} />
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
            <form onSubmit={handleCreateOrUpdateTax}>
              <h2 className="h2-admin">Manage Tax Rate</h2>
              {tax && <label>Current Tax Rate: {tax.taxPrice}%</label>}
              <input
                className="input-admin"
                type="number"
                value={taxRate}
                onChange={handleTaxChange}
                placeholder="Tax rate (%)"
                required
              />
              <button className="button-admin" type="submit">
                {tax.taxPrice ? "Update Tax Rate" : "Create Tax Rate"}
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
      {showDeleteConfirmation && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <label>Are you sure you want to delete this product?</label>
            <button onClick={handleDelete}>Delete</button>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManage;
