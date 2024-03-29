//fronted\my-app\src\features\Register\RegisterAPI.js
import axios from 'axios';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const MY_SERVER = 'http://127.0.0.1:8000/register'

export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(MY_SERVER, formData);    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};
