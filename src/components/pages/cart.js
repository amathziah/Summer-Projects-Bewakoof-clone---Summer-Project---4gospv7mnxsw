import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CartPage.css"

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    console.error('No auth token found in localStorage');
                    return;
                }

                const response = await axios.get('http://localhost:4000/cart', {
                    headers: {
                        'auth-token': authToken,
                    }
                });

                const { cartData } = response.data;
                setCartItems(cartData);

                const productDetailsPromises = cartData.map(item =>
                    fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${item.productId}`, {
                        headers: {
                            'projectId': 'f104bi07c490'
                        }
                    }).then(response => response.json())
                );

                const productDetailsResults = await Promise.all(productDetailsPromises);
                const newProductDetails = productDetailsResults.reduce((acc, product) => {
                    acc[product.data._id] = product.data;
                    return acc;
                }, {});

                setProductDetails(newProductDetails);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setError('Failed to fetch cart data');
                setIsLoading(false);
            }
        };

        fetchCartData();
    }, []);

    const handleIncreaseQuantity = async (itemId) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                console.error('No auth token found in localStorage');
                return;
            }

            const response = await axios.post('http://localhost:4000/updatecart', {
                productId: itemId,
                quantity: 1 // Increment by 1
            }, {
                headers: {
                    'auth-token': authToken,
                }
            });

            if (response.data.success) {
                setCartItems(cartItems.map(item =>
                    item.productId === itemId ? { ...item, quantity: item.quantity + 1 } : item
                ));
            } else {
                console.error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleDecreaseQuantity = async (itemId) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                console.error('No auth token found in localStorage');
                return;
            }

            const response = await axios.post('http://localhost:4000/updatecart', {
                productId: itemId,
                quantity: -1 // Decrement by 1
            }, {
                headers: {
                    'auth-token': authToken,
                }
            });

            if (response.data.success) {
                setCartItems(cartItems.map(item =>
                    item.productId === itemId ? { ...item, quantity: item.quantity - 1 } : item
                ).filter(item => item.quantity > 0));
            } else {
                console.error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const getTotalCartCost = () => {
        return cartItems.reduce((total, item) => {
            const product = productDetails[item.productId];
            if (product) {
                return total + (product.price * item.quantity);
            }
            return total;
        }, 0);
    };

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-4 p-6">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item mb-4 p-4 border-b border-gray-200">
                                <div className="flex items-center">
                                    {productDetails[item.productId] && (
                                        <img
                                            className="w-20 h-20 object-cover rounded"
                                            src={productDetails[item.productId].images[0]}
                                            alt={productDetails[item.productId].name}
                                        />
                                    )}
                                    <div className="ml-4">
                                        <p className="text-lg font-semibold">{productDetails[item.productId]?.name}</p>
                                        <p className="text-gray-700">Brand: {productDetails[item.productId]?.brand}</p>
                                        <p className="text-gray-700">Price: {productDetails[item.productId]?.price} INR</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => handleDecreaseQuantity(item.productId)}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md mr-2"
                                            >
                                                -
                                            </button>
                                            <p className="text-gray-700">Quantity: {item.quantity}</p>
                                            <button
                                                onClick={() => handleIncreaseQuantity(item.productId)}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md ml-2"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total-cart">
                        <h3 className="text-xl font-semibold mt-4">Total Cart Cost: {getTotalCartCost()} INR</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;




