import React, { useState, useEffect } from "react";
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
import getProducts from "../dummyDb/allProducts";
import { Product } from "../components/Product";
import Invoice from "../components/Invoice";
import { addToInvoice, removeFromInvoice } from "../utils/invoiceUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
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

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products
    .flat()
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const paginatedFilteredProducts = [];
  for (let i = 0; i < filteredProducts.length; i += 12) {
    paginatedFilteredProducts.push(filteredProducts.slice(i, i + 12));
  }

  return (
    <div className="menu-container">
      <Sidebar />
      <TopBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
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
            {paginatedFilteredProducts.length === 0 ? (
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
                {paginatedFilteredProducts.map((productArray, index) => (
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
