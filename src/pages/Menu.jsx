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
import Categories from "../components/categories";
import { categories } from "../dummyDb/categoriesDB";
import { Product } from "../components/Product";
import Invoice from "../components/Invoice";
import { addToInvoice, removeFromInvoice } from "../utils/invoiceUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import allProducts from "../dummyDb/allProducts";
import "swiper/css/navigation";
import "swiper/css";
import "../styles/menu.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  const [category, setCategory] = useState(categories[0].id);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const getProducts = (category_id) => {
    if (category_id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const filteredProducts = allProducts.filter(
            (product) => product.category_id === category_id
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
          console.log(newProducts);
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
      });
  }, [category]);

  return (
    <div className="menu-container">
      <Sidebar />
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
      />
      <div className="categories-products-container">
        <div className="categories-container">
          {categories.map((cat) => (
            <div key={cat.id} onClick={() => setCategory(cat.id)}>
              <Categories
                icon={iconMapping[cat.icon]}
                name={cat.name}
                stock={cat.stock}
                selected={category === cat.id}
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
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {filteredProducts.map((productArray, index) => (
                  <SwiperSlide
                    className="swiper-slide"
                    key={index}
                    spaceBetween={50}
                    slidesPerView={4}
                  >
                    <div className="products-container">
                      {productArray.map((product) => (
                        <Product
                          key={product.id}
                          product={product}
                          quantity={
                            selectedProducts.find((p) => p.id === product.id)
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
          <Invoice selectedProducts={selectedProducts} />
        </div>
      )}
    </div>
  );
};

export default Menu;
