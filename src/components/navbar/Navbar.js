// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"

const Navbar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout(); // Update login status in parent component
        navigate('/'); // Navigate to homepage after logout
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            // Navigate to search results page or perform search action
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(''); // Clear search input after navigation
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className="navbar flex justify-between items-center p-4 bg-gray-100">
            <div className="navbar-logo">
                <Link to="/">
                    <img
                        src="https://shopprekart.com/cdn/shop/collections/bewakoof-online-shopping.jpg?v=1659015382"
                        alt="Logo"
                        className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
                    />
                </Link>
            </div>
            <div className="navbar-section flex gap-10">
                <Link to="/mens" className="rounded-md">Mens</Link>
                <Link to="/womens" className="rounded-md">Womens</Link>
                <Link to="/cart" className="rounded-md">cart</Link>
            </div>
            <div className="navbar-search flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="rounded-md p-2"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2">
                    Search
                </button>
            </div>
            <div className="navbar-auth">
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="rounded-md bg-red-500 text-black px-4 py-2">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="loginbutton">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;



















