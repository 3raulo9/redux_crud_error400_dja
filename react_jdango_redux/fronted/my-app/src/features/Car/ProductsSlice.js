    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
        Products: [],
        newProduct: { image: null }
    };
    
    const ProductSlice = createSlice({
        name: 'Product',
        initialState,
        reducers: {
            getProduct: (state, action) => {
                return action.payload;
            },
            addProduct: (state, action) => {
                state.Products.push(action.payload);
            },
            deleteProduct: (state, action) => {
                state.Products = state.Products.filter((Product) => Product.id !== action.payload);
            },
            updateProduct: (state, action) => {
                const index = state.Products.findIndex((Product) => Product.id === action.payload.id);
                if (index !== -1) {
                    state.Products[index] = action.payload;
                }
            },
            handleImageChange: (state, action) => {
                state.newProduct.image = action.payload;
            }
        },
    });

    export const { getProduct, addProduct, deleteProduct, updateProduct, handleImageChange } = ProductSlice.actions;

    export default ProductSlice.reducer;