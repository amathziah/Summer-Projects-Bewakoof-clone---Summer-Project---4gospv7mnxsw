import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useShop } from '../../ShopContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const { state } = useShop(); // Access the state from the context
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1); // default quantity to 1
    const [cartMessage, setCartMessage] = useState(''); // State to hold the cart message

    useEffect(() => {
        async function fetchProductDetails() {
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
                setProduct(data.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        fetchProductDetails();
    }, [productId]);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
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

            // Set cart message on success
            setCartMessage('Item added to cart successfully!');
            setTimeout(() => setCartMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // Handle error or display error message
            setCartMessage('Error adding item to cart. Please try again.');
            setTimeout(() => setCartMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error fetching product details: {error.message}</p>;
    }

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-4">
            <div className="flex">
                <div style={{ width: '20%', marginRight: '20px' }}>
                    {product.images && product.images.map((image, index) => (
                        <img
                            key={index}
                            className={`object-cover rounded-lg ${index === selectedImageIndex ? 'border-2 border-blue-500' : ''}`}
                            src={image}
                            alt={`Product ${index + 1}`}
                            style={{ width: '250px', height: '250px', marginBottom: '10px', cursor: 'pointer' }}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
                <div className="w-4/5 p-6 bg-gray-100 rounded-lg">
                    <img
                        className="object-cover mb-4"
                        src={product.images[selectedImageIndex]}
                        alt={product.name}
                        style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
                    />
                    <div>
                        <div className="font-bold text-2xl mb-2">{product.name}</div>
                        <p className="text-gray-700 text-base">Brand: {product.brand}</p>
                        <p className="text-gray-900 text-xl font-semibold mb-4">{product.price} INR</p>
                        <p className="text-gray-700 text-base">Ratings: {Math.round(product.ratings)}</p>
                        <p className="text-gray-700 text-base">
                            Sizes:
                            <span className="product-size-list">
                                {product.size.map((size, index) => (
                                    <span key={index} className="size-item">{size}</span>
                                ))}
                            </span>
                        </p>
                        <div className="flex items-center mt-4">
                            <button
                                onClick={handleDecreaseQuantity}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md mr-2"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="border rounded-md p-2 w-20 mr-2 text-center"
                                min="1"
                            />
                            <button
                                onClick={handleIncreaseQuantity}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md ml-2"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product._id)}
                            className="mt-4 px-6 py-3 bg-red-500 text-black rounded-lg shadow-md hover:bg-blue-700"

                        >
                            Add to Cart
                        </button>
                        {cartMessage && <p className="mt-2 text-green-600">{cartMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

