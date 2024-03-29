import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./ProductsAPI";

import { selectLogged, selectUserId } from "../componens/loginSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const isLogged = useSelector(selectLogged);
  const userId = useSelector(selectUserId);
  const [newProduct, setNewProduct] = useState({
    desc: "",
    price: "",
    product: "",
    image: null,
    user: userId, // Include user ID in the new product data
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("desc", newProduct.desc);
      formData.append("price", newProduct.price);
      formData.append("product", newProduct.product);
      formData.append("image", newProduct.image);
      formData.append("user", newProduct.user); // Pass user ID in the form data

      await dispatch(addProduct(formData));
      setNewProduct({
        desc: "",
        price: "",
        product: "",
        image: null,
        user: userId, // Reset user ID after adding the product
      });
      setMessage("Product added successfully!");
      setTimeout(() => setMessage(""), 3000);
      dispatch(getProduct());
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await dispatch(updateProduct(updatedProduct));
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: file, // Store the file object directly
    }));
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      {isLogged ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <input
            type="text"
            name="desc"
            value={newProduct.desc}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*" // Allow only image files
            required
          />

          <button type="submit">Add Product</button>
        </form>
      ) : (
        <p>Please log in to add products</p>
      )}
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.desc}</h3>
            <p>{product.price}</p>
            <img src={product.image} alt="Product" />
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
            <button onClick={() => handleUpdateProduct(product)}>Update</button>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;
