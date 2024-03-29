// fronted\my-app\src\features\Register\registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../Register/RegisterAPI'; // Import registerUser function from API

// Async thunk action to handle user registration
export const registerUserAsync = createAsyncThunk(
  'register/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await registerUser(formData);
      return response.data; // Return data upon successful registration
    } catch (error) {
      // Handle error if registration fails
      throw Error(error.response.data);
    }
  }
);

// Define initial state for registration
const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Create register slice
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [registerUserAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [registerUserAsync.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    [registerUserAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Set error message from the action
      state.success = false;
    },
  },
});

// Export action creators
export const { resetRegistrationState } = registerSlice.actions;

// Export register reducer
export default registerSlice.reducer;
