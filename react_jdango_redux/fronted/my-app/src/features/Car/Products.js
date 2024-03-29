// src/features/Car/Products.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { addNewProduct } from './ProductsSlice';
import { selectLogged } from '../componens/loginSlice'; // Adjust the path to the correct one

function Products() {
  const [productData, setProductData] = useState({
    description: '',
    price: '',
    image: null,
  });

  const dispatch = useDispatch();
  const logged = useSelector(selectLogged); // Use useSelector to get the logged state

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      // Enforce the rule: no more than 3 digits before the decimal point
      const parts = value.split('.');
      if (parts[0].length > 3) {
        alert('Ensure that there are no more than 3 digits before the decimal point.');
        return;
      }
    }
    // Handle file separately because its value is in e.target.files
    if (name === 'image') {
      setProductData({ ...productData, image: e.target.files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    if (productData.image) {
      formData.append('image', productData.image, productData.image.name);
    }
    dispatch(addNewProduct(formData));
  };

  // Conditionally render the form based on the logged state
  if (!logged) {
    // Optionally, render a message or redirect
    return <div>Please log in to access this page.</div>;
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        value={productData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="price"
        value={productData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Products;
