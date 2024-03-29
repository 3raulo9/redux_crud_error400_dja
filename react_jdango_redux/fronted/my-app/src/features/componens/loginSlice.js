// loginSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from './loginAPI'; // Fixed import path

const initialState = {
  logged: false,
  Token: '',
  userId: null,
};

export const doLoginAsync = createAsyncThunk(
  'login/fetchLogin',
  async (credentials) => {
    const response = await fetchLogin(credentials);
    return response.data; // Return both access token and user ID
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.Token = "";
      state.logged = false;
      state.userId = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(doLoginAsync.fulfilled, (state, action) => {
      state.Token = action.payload.access;
      state.userId = action.payload.userId;
      state.logged = true;
    });
  }
});

export const { logout } = loginSlice.actions;
export const selectToken = (state) => state.login.Token;
export const selectLogged = (state) => state.login.logged;
export const selectUserId = (state) => state.login.userId; // Selector for user ID

export default loginSlice.reducer;
