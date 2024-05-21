import Categories from '../components/categories';
import { categories } from '../dummyDb/categoriesDB';
import getProducts from '../dummyDb/allProducts';
import { Product } from '../components/Product';
import { useState, useEffect } from 'react';
import Invoice from '../components/Invoice';
import { addToInvoice, removeFromInvoice } from '../utils/invoiceUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import '../styles/menu.css';


const Menu = () => {
  const [category, setCategory] = useState(categories[0].id);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(category).then((newProducts) => {
      const paginated = [];
        for (let i = 0; i < newProducts.length; i += 9) {
          paginated.push(newProducts.slice(i, i + 9));
        }
        setProducts(paginated);
        setLoading(false);
    }).catch((error) => {
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

  return (
    <div className="menu-container">
      <div className="categories-products-container">
        <div className="categories-container">
        {categories.map((cat) => (
          <div className="category-item" key={cat.id} onClick={() => setCategory(cat.id)}>
            <Categories img={cat.img} name={cat.name} stock={cat.stock} />
          </div>
        ))}
        </div>
        <h1>Menu</h1>
        {loading ? (
            <div className="products-container">
              
            </div>
          ) : (
            <div>
              {
                (products.length === 0) ? (
                  <div className="no-products">No products available</div>
                ) : (
                  <Swiper
                  className="swiper-container" 
                  modules={[Navigation, Pagination, Scrollbar, A11y]} 
                  spaceBetween={50}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
                  >
                  {products.map((productArray, index) => (
                    <SwiperSlide className='swiper-slide' key={index}>
                      <div className="products-container">
                        {
                          
                        productArray.map((product) => (
                          <Product 
                            key={product.id}
                            product={product} 
                            quantity={selectedProducts.find((p) => p.id === product.id)?.quantity || 0} 
                            addToInvoice={() => handleAddToInvoice(product)} 
                            removeFromInvoice={() => handleRemoveFromInvoice(product)} 
                          />
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                )
              }
            </div>
          )}

      </div>
      {
        (selectedProducts.length > 0) && (
          <div className="invoice-container">
            <Invoice selectedProducts={selectedProducts} />
          </div>
        )
      }
    </div>
  );
}

export default Menu;