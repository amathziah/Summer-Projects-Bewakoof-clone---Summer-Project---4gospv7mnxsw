import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    console.error('No auth token found in localStorage');
                    return;
                }
                
                const response = await axios.get('http://localhost:4000/profile', {
                    headers: {
                        'auth-token': authToken
                    }
                });
                
                const cartData = response.data.user.cartData;
                setCartItems(cartData);

                // Fetch product details for each cart item
                cartData.forEach(item => {
                    fetchProductDetails(item.productId);
                });
            } catch (err) {
                setError('Error fetching cart items');
                console.error(err);
            }
        }

        async function fetchProductDetails(productId) {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`, {
                    headers: {
                        'projectId': 'f104bi07c490'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    [productId]: data.data
                }));
            } catch (error) {
                console.error(`Error fetching details for product ${productId}:`, error);
            }
        }

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (itemId, size, newQuantity) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                console.error('No auth token found in localStorage');
                return;
            }

            if (newQuantity <= 0) {
                // If the new quantity is zero or less, remove the item
                await handleRemoveItem(itemId, size);
            } else {
                await axios.post('http://localhost:4000/updatecart', {
                    productId: itemId,
                    quantity: newQuantity,
                    size
                }, {
                    headers: {
                        'auth-token': authToken
                    }
                });

                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.productId === itemId && item.size === size
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (err) {
            setError('Error updating cart item');
            console.error(err);
        }
    };

    const handleRemoveItem = async (itemId, size) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                console.error('No auth token found in localStorage');
                return;
            }

            await axios.delete('http://localhost:4000/removeitem', {
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                },
                data: { productId: itemId, size }
            });
            
            setCartItems(prevItems =>
                prevItems.filter(item => !(item.productId === itemId && item.size === size))
            );
        } catch (err) {
            setError('Error removing item from cart');
            console.error(err);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const product = productDetails[item.productId];
            if (!product) return total;
            const itemPrice = product.price || 0;
            return total + itemPrice * item.quantity;
        }, 0);
    };

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    const totalPrice = calculateTotalPrice();

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-4 p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(item => {
                        const product = productDetails[item.productId];
                        const itemPrice = product ? product.price : 0;
                        return (
                            <div key={`${item.productId}-${item.size}`} className="flex items-center mb-4 border-b pb-4">
                                <img
                                    className="w-32 h-32 object-cover rounded-lg mr-4"
                                    src={product?.images[0]}
                                    alt="Product"
                                />
                                <div className="flex-1">
                                    <h2 className="font-bold text-xl">{product?.name}</h2>
                                    <p className="text-gray-700">Size: {item.size}</p>
                                    <p className="text-gray-700">Price: rs.{itemPrice}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.productId, item.size, item.quantity - 1)}
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md mr-2"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            readOnly
                                            className="border rounded-md p-2 w-20 text-center shadow-md"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(item.productId, item.size, item.quantity + 1)}
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md ml-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.productId, item.size)}
                                        className="mt-4 px-6 py-3 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
                                    >
                                        Remove Item
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex mt-6">
                        <p className="text-xl font-bold">Total Price: rs.{totalPrice.toFixed(2)}</p>
                    </div>
                    <button className="addAddressbutton" onClick={()=>navigate("/AddressPage")}>
                        Add Address
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;













