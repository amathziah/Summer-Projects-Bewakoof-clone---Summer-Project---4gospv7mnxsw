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
    onLogout();
    alert('Logged out successfully');
    navigate('/');
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
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
    <nav className="navbar flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="navbar-logo">
        <a href="/">
          <img
            src="https://shopprekart.com/cdn/shop/collections/bewakoof-online-shopping.jpg?v=1659015382"
            alt="Logo"
            className="w-24 h-auto md:w-32 md:h-auto rounded-full mx-auto"
          />
        </a>
      </div>
      <div className="relative" onMouseEnter={() => setMensDropdownOpen(true)} onMouseLeave={() => setMensDropdownOpen(false)}>
            <a href="/mens" className="text-lg font-medium text-gray-700 hover:text-gray-900">Mens</a>
            {mensDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-md rounded-md p-4 w-96 z-10 flex">
                {/* Left Section: Image */}
                <div className="flex-shrink-0 w-1/3 pr-4">
                    <img src="https://indiater.com/wp-content/uploads/2019/05/1.jpg" alt="" className="w-full h-auto rounded-md" style={{ maxWidth: '300px' }} />
                </div>
                
                {/* Middle Section: Bottomwear */}
                <div className="flex-1 w-1/3 pr-4">
                    <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Bottomwear</h4>
                    <ul>
                        <li><button onClick={() => handleCategoryClick('Men', 'jogger')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Joggers</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'jeans')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Jeans</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'kurta')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Kurta</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'pyjamas')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Pajamas</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'tracksuit')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Tracksuit</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'trouser')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Trousers</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'shorts')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Shorts</button></li>
                    </ul>
                    </div>
                </div>
                
                {/* Right Section: Topwear */}
                <div className="flex-1 w-1/3">
                    <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Topwear</h4>
                    <ul>
                        <li><button onClick={() => handleCategoryClick('Men', 'hoodie')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Hoodie</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'jumpsuit')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">JumpSuit</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'kurta')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Kurta</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'shirt')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Shirt</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'shorts')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Shorts</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'sweater')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Sweater</button></li>
                        <li><button onClick={() => handleCategoryClick('Men', 'tshirt')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">T-Shirt</button></li>
                    </ul>
                    </div>
                </div>
                </div>
            )}
        </div>              
<div className="relative" onMouseEnter={() => setWomensDropdownOpen(true)} onMouseLeave={() => setWomensDropdownOpen(false)}>
  <a href="/womens" className="text-lg font-medium text-gray-700 hover:text-gray-900">Womens</a>
  {womensDropdownOpen && (
    <div className="absolute left-0 top-full mt-1 bg-white shadow-md rounded-md p-4 w-96 z-10 flex">
      {/* Left Section: Image */}
      <div className="flex-shrink-0 w-1/3 pr-4">
        <img src="https://cdn.create.vista.com/downloads/0eff746c-5cbe-4a33-96ff-c8ee490d255b_640.jpeg" alt="" className="w-full h-auto rounded-md" style={{ maxWidth: '300px' }} />
      </div>
      
      {/* Middle Section: Bottomwear */}
      <div className="flex-1 w-1/3 pr-4">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Bottomwear</h4>
          <ul>
            <li><button onClick={() => handleCategoryClick('Women', 'jogger')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Joggers</button></li>
            <li><button onClick={() => handleCategoryClick('Women', 'jeans')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Jeans</button></li>
          </ul>
        </div>
      </div>
      
      {/* Right Section: Topwear */}
      <div className="flex-1 w-1/3">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Topwear</h4>
          <ul>
            <li><button onClick={() => handleCategoryClick('Women', 'hoodie')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Hoodie</button></li>
            <li><button onClick={() => handleCategoryClick('Women', 'jumpsuit')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">JumpSuit</button></li>
            <li><button onClick={() => handleCategoryClick('Women', 'kurti')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Kurti</button></li>
            <li><button onClick={() => handleCategoryClick('Women', 'shirt')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Shirt</button></li>
            <li><button onClick={() => handleCategoryClick('Women', 'sweater')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">Sweater</button></li>
            <li><button onClick={() => handleCategoryClick('Women', 'tshirt')} className="block text-left hover:bg-gray-100 px-2 py-1 rounded">T-Shirt</button></li>
          </ul>
        </div>
      </div>
    </div>
  )}
     </div>





      <div className="navbar-search flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white rounded-md px-4 py-2">
          Search
        </button>
      </div>
      <div className="navbar-cart-auth flex items-center">
        <a href="/cart" className="text-lg font-medium text-gray-700 hover:text-gray-900 mr-4">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
        </a>
        <div className="navbar-divider"></div>
        <div className="navbar-auth relative">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="dropdown-toggle">
                <FontAwesomeIcon icon={faUser} className="text-lg font-medium text-gray-700 hover:text-gray-900" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu absolute right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-md p-2">
                  <a href="/profile" className="block text-gray-700 hover:text-gray-900">Profile</a>
                  <button onClick={handleLogout} className="block w-full text-left text-gray-700 hover:text-gray-900">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="bg-blue-500 text-white rounded-md px-4 py-2">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


























