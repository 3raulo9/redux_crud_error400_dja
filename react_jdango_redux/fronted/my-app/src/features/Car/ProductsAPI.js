// src/features/Car/ProductsAPI.js
const BASE_URL = 'http://127.0.0.1:8000'; // Adjust this based on your actual API base URL

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products/`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

export const submitProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products/`, {
    method: 'POST',
    body: productData,
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to submit product');
  }
  return await response.json();
};
