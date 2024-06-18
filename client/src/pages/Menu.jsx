import React, { useState, useEffect, useMemo } from "react";
import {
  faBreadSlice,
  faHamburger,
  faUtensils,
  faBowlFood,
  faIceCream,
  faDrumstickBite,
  faAppleAlt,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Categories from "../components/categories";
import { Product } from "../components/Product";
import Invoice from "../components/Invoice";
import { addToInvoice, removeFromInvoice } from "../utils/invoiceUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import axios from "axios";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "../styles/menu.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

library.add(
  faBreadSlice,
  faHamburger,
  faUtensils,
  faBowlFood,
  faIceCream,
  faDrumstickBite,
  faAppleAlt,
  faCoffee
);
const iconMapping = {
  breakfast: faBreadSlice,
  lunch: faHamburger,
  dinner: faUtensils,
  soup: faBowlFood,
  desserts: faIceCream,
  sideDish: faDrumstickBite,
  appetizer: faAppleAlt,
  beverages: faCoffee,
};

const Menu = () => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/category/getAll"
        );
        const categoriesArray = response.data.data.map((cat) => ({
          ...cat,
          icon: cat.icon,
        }));
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/product/getAll"
        );
        const ProductsArray = response.data.data;
        setAllProducts(ProductsArray);
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getProducts = (categoryId) => {
    if (categoryId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const filteredProducts = allProducts.filter(
            (product) => product.category._id === categoryId
          );
          resolve(filteredProducts);
        }, 10);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(allProducts);
      });
    }
  };

  const handleSearchFocus = () => {
    setCategory(null);
    setLoading(true);
    getProducts()
      .then((newProducts) => {
        const paginated = [];
        for (let i = 0; i < newProducts.length; i += 12) {
          paginated.push(newProducts.slice(i, i + 12));
        }
        setProducts(paginated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products
      .map((productArray) =>
        productArray.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      .filter((productArray) => productArray.length > 0);
  }, [products, searchQuery]);

  const handleAddToInvoice = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      addToInvoice(product, prevSelectedProducts)
    );
  };

  const handleRemoveFromInvoice = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      removeFromInvoice(product, prevSelectedProducts)
    );
  };

  useEffect(() => {
    setLoading(true);
    getProducts(category)
      .then((newProducts) => {
        const paginated = [];
        for (let i = 0; i < newProducts.length; i += 12) {
          paginated.push(newProducts.slice(i, i + 12));
        }
        setProducts(paginated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      }); // eslint-disable-next-line
  }, [category]);
  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
      />
      <div className="categories-products-container">
        <div className="categories-container">
          {categories.map((cat) => (
            <div key={cat._id} onClick={() => setCategory(cat._id)}>
              <Categories
                icon={iconMapping[cat.icon] || faBreadSlice}
                name={cat.name}
                stock={cat.stock}
                selected={category === cat._id}
              />
            </div>
          ))}
        </div>

        <h1 style={{ paddingLeft: "60px", paddingTop: "20px" }}>Menu</h1>
        {loading ? (
          <div className="products-container"></div>
        ) : (
          <div>
            {filteredProducts.length === 0 ? (
              <div
                className="no-products"
                style={{ paddingLeft: "60px", paddingTop: "20px" }}
              >
                No products available
              </div>
            ) : (
              <Swiper
                className="swiper-container"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {filteredProducts.map((productArray, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="products-container">
                      {productArray.map((product) => (
                        <Product
                          key={product._id}
                          product={product}
                          quantity={
                            selectedProducts.find((p) => p._id === product._id)
                              ?.quantity || 0
                          }
                          addToInvoice={() => handleAddToInvoice(product)}
                          removeFromInvoice={() =>
                            handleRemoveFromInvoice(product)
                          }
                        />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}
      </div>
      {selectedProducts.length > 0 && (
        <div className="invoice-container">
          <Invoice
            selectedProducts={selectedProducts}
            addToInvoice={handleAddToInvoice}
            removeFromInvoice={handleRemoveFromInvoice}
            userId={userId}
          />
        </div>
      )}
    </div>
  );
};

export default Menu;
