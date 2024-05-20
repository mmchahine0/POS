import Categories from '../components/categories';
import { categories } from '../dummyDb/categoriesDB';
import getProducts from '../dummyDb/allProducts';
import { Product } from '../components/Product';
import { useState, useEffect } from 'react';
import Invoice from '../components/Invoice';
import { addToInvoice, removeFromInvoice } from '../utils/invoiceUtils';
import '../styles/menu.css';


const Menu = () => {
  const [category, setCategory] = useState(categories[0].id);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(category).then((newProducts) => {
      setProducts(newProducts);
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
        {loading ? (
            <div className="products-container">
            </div>
          ) : (
            <div className="products-container">
              {products.length === 0 ? (
                <div>No products available.</div>
              ) : (
                products.map((product) => {
                  const selectedProduct = selectedProducts.find(p => p.id === product.id);
                  const quantity = selectedProduct ? selectedProduct.quantity : 0;
                  return (
                    <Product 
                      key={product.id} 
                      product={product} 
                      quantity={quantity}
                      addToInvoice={() => handleAddToInvoice(product)}
                      removeFromInvoice={() => handleRemoveFromInvoice(product)}
                    />
                  );
                })
              )}
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