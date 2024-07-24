// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ProductList from './components/pages/homepage/ProductList';
import ProductDetails from './components/pages/homepage/productdetails';
import SearchResults from './components/pages/search/SearchResults';
import Footer from './components/pages/footer/Footer';
import Mens from './components/pages/homepage/section/Mens';
import Womens from './components/pages/homepage/section/Womens';
import CategoryPage from './components/pages/search/CategoryPage';
import Login from './components/pages/signup/Login.js'
import SignUp from './components/pages/signup/Signup.js';
import CartPage from './components/pages/cart/cart';
import Profile from './components/pages/signup/Profile';
import ProductListPage from './components/pages/ProductListPage';
import { ProductsProvider } from './components/context/ProductsContext';
import AddAddressPage from './components/pages/AddAddressPage.js';
import PaymentPage from './components/pages/PaymentPage.js';


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
            <div className="app-container">
                <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <div style={{ marginTop: '0%' }}>
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
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/category/:gender/:category" element={<ProductListPage />}/>
                        <Route path="/AddressPage" element={<AddAddressPage/>} />
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













