import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CartPage.css"

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productDetails, setProductDetails] = useState({}); // State to store product details
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    setError('No auth token found in localStorage');
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:4000/cart', {
                    headers: {
                        'auth-token': authToken,
                    }
                });

                if (response.data.success) {
                    setCartItems(response.data.cartData);

                    // Fetch details for each product in cart
                    const productIds = response.data.cartData.map(item => item.productId);
                    await fetchProductDetails(productIds);
                } else {
                    setError('Failed to fetch cart data');
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setError('Failed to fetch cart data');
                setIsLoading(false);
            }
        };
        const handleAddToCart = async (itemId) => {
            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    console.error('No auth token found in localStorage');
                    return;
                }
    
                const response = await fetch('http://localhost:4000/addtocart', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': authToken,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: itemId, quantity }) // pass productId and quantity
                });
    
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.errors || 'Failed to add to cart');
                }
    
                // Handle success or update UI as needed
            } catch (error) {
                console.error('Error adding product to cart:', error);
                // Handle error or display error message
            }
        };

        const fetchProductDetails = async (productIds) => {
            try {
                const detailsPromises = productIds.map(productId =>
                    axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`, {
                        headers: {
                            'projectId': 'f104bi07c490'
                        }
                    })
                );

                const detailsResponses = await Promise.all(detailsPromises);
                const productDetailsData = detailsResponses.map(res => res.data.data);

                // Create a mapping of productId to its details
                const detailsMap = productDetailsData.reduce((acc, product) => {
                    acc[product._id] = product;
                    return acc;
                }, {});

                setProductDetails(detailsMap);
            } catch (error) {
                console.error('Error fetching product details:', error);
                // Handle error fetching product details
            }
        };

        fetchCartData();
    }, []);

    const handleIncreaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.productId === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleDecreaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.productId === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems.filter(item => item.quantity > 0));
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
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item mb-4 p-4 border-b border-gray-200">
                            <div className="flex items-center">
                                {productDetails[item.productId] && (
                                    <img
                                        className="w-20 h-20 object-cover rounded"
                                        src={productDetails[item.productId].images[0]} // Assuming first image
                                        alt={productDetails[item.productId].name}
                                    />
                                )}
                                <div className="ml-4">
                                    <p className="text-lg font-semibold">{item.productId}</p>
                                    {productDetails[item.productId] && (
                                        <div>
                                            <p className="text-gray-700">Name: {productDetails[item.productId].name}</p>
                                            <p className="text-gray-700">Brand: {productDetails[item.productId].brand}</p>
                                            <p className="text-gray-700">Price: {productDetails[item.productId].price} INR</p>
                                        </div>
                                    )}
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
            )}
        </div>
    );
};

export default CartPage;


