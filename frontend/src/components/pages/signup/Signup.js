import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const SignUp = () => {
  const [formData, setFormData] = useState({username: '',email: '',password: '',});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Account created succesfully")
        navigate('/login');
      } else {
        console.error('Signup error:', data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;


