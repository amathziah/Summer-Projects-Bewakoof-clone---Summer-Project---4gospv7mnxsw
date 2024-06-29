// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import your CSS file

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                // Update login status and navigate to homepage
                localStorage.setItem('token', data.token);
                onLogin(data.token); // Update login status in parent component
                navigate('/'); // Navigate to homepage
            } else {
                // Handle login errors (e.g., display error message)
                console.error('Login error:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="form-container" >
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Password:
                    <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit" className="form-button" >Login</button>
            </form>
        </div>
    );
};

export default Login;




