import React, { useState } from "react";
import "../styles/Admin.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    image: "",
    price: 0,
    category: "",
  });

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({
      name: "",
      description: "",
      quantity: 0,
      image: "",
      price: 0,
      category: "",
    });
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleEditProduct = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="product-management">
      <h2 className="h2-admin">Manage Products</h2>
      <input
        className="input-admin"
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Product name"
      />
      <input
        className="input-admin"
        type="text"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        placeholder="Product description"
      />
      <input
        className="input-admin"
        type="number"
        value={newProduct.quantity}
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: e.target.value })
        }
        placeholder="Product quantity"
      />
      <input
        className="input-admin"
        type="text"
        value={newProduct.image}
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.value })
        }
        placeholder="Product image URL"
      />
      <input
        className="input-admin"
        type="number"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
        placeholder="Product price"
      />
      <input
        className="input-admin"
        type="text"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
        placeholder="Product category"
      />
      <button className="button-admin" onClick={handleAddProduct}>
        Add Product
      </button>
      <ul className="ul-admin">
        {products.map((product, index) => (
          <li className="li-admin" key={index}>
            <input
              className="input-admin"
              type="text"
              value={product.name}
              onChange={(e) => handleEditProduct(index, "name", e.target.value)}
            />
            <input
              className="input-admin"
              type="text"
              value={product.description}
              onChange={(e) =>
                handleEditProduct(index, "description", e.target.value)
              }
            />
            <input
              className="input-admin"
              type="number"
              value={product.quantity}
              onChange={(e) =>
                handleEditProduct(index, "quantity", e.target.value)
              }
            />
            <input
              className="input-admin"
              type="text"
              value={product.image}
              onChange={(e) =>
                handleEditProduct(index, "image", e.target.value)
              }
            />
            <input
              className="input-admin"
              type="number"
              value={product.price}
              onChange={(e) =>
                handleEditProduct(index, "price", e.target.value)
              }
            />
            <input
              className="input-admin"
              type="text"
              value={product.category}
              onChange={(e) =>
                handleEditProduct(index, "category", e.target.value)
              }
            />
            <button
              className="button-admin"
              onClick={() => handleDeleteProduct(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
