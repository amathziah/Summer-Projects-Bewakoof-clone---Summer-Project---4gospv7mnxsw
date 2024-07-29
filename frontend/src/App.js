// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.js';
import ProductList from './components/pages/homepage/ProductList.js';
import ProductDetails from './components/pages/homepage/productdetails.js';
import SearchResults from './components/pages/search/SearchResults.js';
import Footer from './components/pages/footer/Footer.js';
import Mens from './components/pages/homepage/section/Mens.js';
import Womens from './components/pages/homepage/section/Womens.js';
import CategoryPage from './components/pages/search/CategoryPage.js';
import Login from './components/pages/signup/Login.js';
import SignUp from './components/pages/signup/Signup.js';
import CartPage from './components/pages/cart/cart.js';
import Profile from './components/pages/signup/Profile.js';
import ProductListPage from './components/pages/ProductListPage.js';
import { ProductsProvider } from './components/context/ProductsContext.js';
import AddAddressPage from './components/pages/address/AddAddressPage.js';
import PaymentPage from './components/pages/payment/PaymentPage.js';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <ProductsProvider>
            <Router>
                <div className="app-container flex flex-col min-h-screen">
                    <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <div className="flex-grow mt-4">
                        <Routes>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/product/:productId" element={<ProductDetails />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/mens" element={<Mens />} />
                            <Route path="/womens" element={<Womens />} />
                            <Route path="/category/:category" element={<CategoryPage />} />
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/category/:gender/:category" element={<ProductListPage />} />
                            <Route path="/AddressPage" element={<AddAddressPage />} />
                            <Route path="/payment" element={<PaymentPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ProductsProvider>
    );
};

export default App;














