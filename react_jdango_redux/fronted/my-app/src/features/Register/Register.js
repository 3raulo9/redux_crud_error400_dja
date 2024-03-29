import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from './RegisterAPI'; // Correct the import path

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData));
      setSuccessMessage('Registration successful!'); // Set success message
      setTimeout(() => {
        setSuccessMessage(''); // Clear success message after some time
      }, 3000); // Adjust time as needed
      setFormData({ username: '', email: '', password: '' }); // Clear form fields
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
