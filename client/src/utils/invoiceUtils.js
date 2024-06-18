export const addToInvoice = (product, prevSelectedProducts) => {
  const productIndex = prevSelectedProducts.findIndex((p) => p._id === product._id);
  if (productIndex >= 0) {
    const updatedProducts = [...prevSelectedProducts];
    updatedProducts[productIndex] = { ...updatedProducts[productIndex], quantity: updatedProducts[productIndex].quantity + 1 };
    return updatedProducts;
  } else {
    return [...prevSelectedProducts, { ...product, quantity: 1 }];
  }
};

export const removeFromInvoice = (product, prevSelectedProducts) => {
  const productIndex = prevSelectedProducts.findIndex((p) => p._id === product._id);
  if (productIndex >= 0) {
    const updatedProducts = [...prevSelectedProducts];
    if (updatedProducts[productIndex].quantity > 1) {
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: updatedProducts[productIndex].quantity - 1
      };
    } else {
      updatedProducts.splice(productIndex, 1);
    }
    return updatedProducts;
  }
  return prevSelectedProducts;
};
