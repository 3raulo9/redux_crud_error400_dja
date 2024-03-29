import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginSlice from '../features/componens/loginSlice';
import productSlice from '../features/Car/ProductsSlice';
import registerSlice from '../features/Register/registerSlice';

const rootReducer = combineReducers({
  login: loginSlice,
  Products:productSlice,
Regester: registerSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;