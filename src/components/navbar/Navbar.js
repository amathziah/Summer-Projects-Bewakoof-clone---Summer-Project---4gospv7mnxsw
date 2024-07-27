import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mensDropdownOpen, setMensDropdownOpen] = useState(false);
    const [womensDropdownOpen, setWomensDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout(); // Update login status in parent component
        alert("logged out sucessfully")
        navigate('/'); // Navigate to homepage after logout
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            // Navigate to search results page or perform search action
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleCategoryClick = (gender, category) => {
        navigate(`/category/${gender}/${category}`);
        setMensDropdownOpen(false);
        setWomensDropdownOpen(false);
    };

    return (
        <nav className="navbar flex justify-between items-center p-4 bg-gray-100">
            <div className="navbar-logo">
                <a href="/">
                    <img
                        src="https://shopprekart.com/cdn/shop/collections/bewakoof-online-shopping.jpg?v=1659015382"
                        alt="Logo"
                        className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
                    />
                </a>
            </div>
            <div className="navbar-section flex gap-10">
                <div
                    className="relative1"
                    onMouseEnter={() => setMensDropdownOpen(true)}
                    onMouseLeave={() => setMensDropdownOpen(false)}
                >
                    <a href="/mens" className="rounded-md">Mens</a>
                    {mensDropdownOpen && (
                        <div className="flex absolute shadow-md rounded-md p-2 mt-1 dropdown-container" style={{width:"40vw"}}>
                            <div className="banner" style={{width:"20%"}}>
                                <img src="https://indiater.com/wp-content/uploads/2019/05/1.jpg" alt="" style={{width:"100%"}}/>
                            </div>
                            <div className="dropdown-bottomwear">
                                <h4>Bottomwear</h4>
                                <ul>
                                    <li><button onClick={() => handleCategoryClick('Men', 'jogger')}>Joggers</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men', 'jeans')}>Jeans</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men', 'kurta')}>Kurta</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men', 'pyjamas')}>Pajamas</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men', 'tracksuit')}>TrackSuit</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men', 'trouser')}>Trousers</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','shorts')}>Shorts</button></li>
                                </ul>
                            </div>
                            <div className="dropdown-topwear">
                                <h4>Topwear</h4>
                                <ul>
                                    <li><button onClick={() => handleCategoryClick('Men','hoodie')}>Hoodie</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','jumpsuit')}>JumpSuit</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','kurta')}>Kurta</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','shirt')}>Shirt</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','shorts')}>Shorts</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','sweater')}>Sweater</button></li>
                                    <li><button onClick={() => handleCategoryClick('Men','tshirt')}>T-Shirt</button></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className="relative1"
                    onMouseEnter={() => setWomensDropdownOpen(true)}
                    onMouseLeave={() => setWomensDropdownOpen(false)}
                >
                    <a href="/womens" className="rounded-md">Womens</a>
                    {womensDropdownOpen && (
                        <div className="flex shadow-md rounded-md p-2 mt-1 dropdown-container" style={{width:"40vw"}}>
                            <div className="dropdown-bottomwear">
                                <h4>Bottomwear</h4>
                                <ul>
                                    <li><button onClick={() => handleCategoryClick('Women','jogger')}>Joggers</button></li>
                                    <li><button onClick={() => handleCategoryClick('Women','jeans')}>Jeans</button></li>
                                </ul>
                            </div>
                            <div className="dropdown-topwear">
                                <h4>Topwear</h4>
                                <ul>
                                    <li><button onClick={() => handleCategoryClick('Women','hoodie')}>Hoodie</button></li>
                                    <li><button onClick={() => handleCategoryClick('Women','jumpsuit')}>JumpSuit</button></li>
                                    <li><button onClick={() => handleCategoryClick('Women','kurti')}>kurti</button></li>
                                    <li><button onClick={() => handleCategoryClick('Women','shirt')}>Shirt</button></li>
                                    <li><button onClick={() => handleCategoryClick('Women','sweater')}>Sweater</button></li>
                                    <li><button onClick={() => handleCategoryClick('Women','tshirt')}>T-Shirt</button></li>
                                </ul>
                            </div>
                            <div className="banner" style={{width:"30%"}}>
                                <img src="https://cdn.create.vista.com/downloads/0eff746c-5cbe-4a33-96ff-c8ee490d255b_640.jpeg" alt="" style={{width:"100%"}}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="navbar-search flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="rounded-md p-2 mr-2" // Adjusted margin here
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white rounded-md px-4 py-2">
                    Search
                </button>
            </div>
            
            <div className="navbar-cart-auth flex items-center">
                <a href="/cart" className="rounded-md cart-link">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                </a>
                <div className="navbar-divider"></div>
                <div className="navbar-auth relative">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="dropdown-toggle">
                                <FontAwesomeIcon icon={faUser} className="mr-1" />
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <a href="/profile">Profile</a>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="/login" className="loginbutton">
                            Login
                        </a>
                    )}
                </div>
                
            </div>
        </nav>
    );
};

export default Navbar;


























