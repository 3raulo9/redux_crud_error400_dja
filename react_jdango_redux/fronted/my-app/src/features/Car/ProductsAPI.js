import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your actual API URL

export const addProduct = (product) => {
    return async (dispatch) => {
        try {
            // Ensure that the product object includes all required fields
            const res = await axios.post(`${API_URL}/products/`, product);
            dispatch({ type: 'Product/addProduct', payload: res.data }); 
            return res.data;
        } catch (error) {
            console.error(error);
            // If there's an error, you can handle it accordingly.
            // For example, you can dispatch an action with an error payload.
            dispatch({ type: 'Product/addProductError', payload: error.message });
        }
    };
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/products/${id}/`);  // Added trailing slash
        dispatch({ type: 'Product/deleteProduct', payload: id }); // Use 'Product/deleteProduct' as the action type
    } catch (error) {
        console.error(error);
    }
};

export const updateProduct = (updatedProduct) => async (dispatch) => {
    try {
        await axios.put(`${API_URL}/products/${updatedProduct.id}/`, updatedProduct);  // Added trailing slash
        dispatch({ type: 'Product/updateProduct', payload: updatedProduct }); // Use 'Product/updateProduct' as the action type
    } catch (error) {
        console.error(error);
    }
};
export const getProduct = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/`);  // Added trailing slash
        dispatch({ type: 'Product/getProduct', payload: response.data }); // Use 'Product/getProduct' as the action type
    } catch (error) {
        console.error(error);
    }
};