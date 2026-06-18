const API_URL = "http://localhost:5000";

// PRODUCTS
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
};

// ADD TO CART
export const addToCart = async (productId) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerName: "Danusha",
      productId,
      quantity: 1,
    }),
  });

  return await response.json();
};

// GET CART ITEMS
export const getCartItems = async () => {
  const response = await fetch(`${API_URL}/cart`);
  return await response.json();
};

//DELETE CART ITEMS
export const removeCartItem = async (id) => {
  const response = await fetch(`http://localhost:5000/cart/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};