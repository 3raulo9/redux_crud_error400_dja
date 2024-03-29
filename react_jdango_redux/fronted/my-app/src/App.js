// App.js
import React from 'react';
// import { useSelector } from 'react-redux';  // Commented out because it's not used
import Login from './features/componens/Login';
import Register from './features/Register/Register'
import Products from './features/Car/Products';
const App = () => {
  // const items = useSelector((state) => state.items);  // Commented out because it's not used

  return (
    <div>
      <Login />
      <Products/>
      <Register/>
      
    </div>
  );
};

export default App;