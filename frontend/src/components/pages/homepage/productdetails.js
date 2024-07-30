import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [cartMessage, setCartMessage] = useState('');
    const imageRef = useRef(null);
    console.log(imageRef)

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

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleAddToCart = async (itemId) => {
        try {
            if (!selectedSize) {
                alert("Please select a size.");
                return;
            }

            const authToken = localStorage.getItem('token');
            if (!authToken) {
                console.error('No auth token found in localStorage');
                alert("Login to continue");
                return;
            }

            const response = await fetch('http://localhost:4000/addtocart', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: itemId, quantity, size: selectedSize })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors || 'Failed to add to cart');
            }

            setCartMessage('Item added to cart successfully!');
            setTimeout(() => setCartMessage(''), 3000);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            setCartMessage('Error adding item to cart. Please try again.');
            setTimeout(() => setCartMessage(''), 3000);
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
                <div className="flex flex-col items-center w-1/12 overflow-y-auto" style={{ maxHeight: '500px' }}>
                    {product.images && product.images.map((image, index) => (
                        <img
                            key={index}
                            className={`object-cover rounded-lg cursor-pointer mb-2 ${index === selectedImageIndex ? 'border-2 border-blue-500' : ''}`}
                            src={image}
                            alt={`Product ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                            style={{ maxHeight: '100px' }} // Set max height for thumbnails
                        />
                    ))}
                </div>
                <div className="w-11/12 p-6 bg-gray-100 rounded-lg flex">
                    <img
                        ref={imageRef}
                        className="object-cover mb-4 hover:opacity-80 max-w-lg"
                        src={product.images[selectedImageIndex]}
                        alt={product.name}
                    />
                    <div className="ml-6">
                        <h2 className="font-bold text-2xl mb-2">{product.name}</h2>
                        <p className="hover:text-gray-700">Brand: {product.brand}</p>
                        <p className="text-gray-900 text-xl font-semibold mb-4 hover:text-blue-700">{product.price} INR</p>
                        <p className="text-gray-700 text-base">Ratings: {Math.round(product.ratings)}</p>
                        
                        <p className="text-gray-700 text-base mt-2">
                            Sizes:
                            <select value={selectedSize} onChange={handleSizeChange} className="ml-2 border rounded-md p-2">
                                <option value="">Select a size</option>
                                {product.size.map((size, index) => (
                                    <option key={index} value={size}>{size}</option>
                                ))}
                            </select>
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
                                className="border rounded-md p-2 w-20 text-center shadow-md"
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
                            className="mt-4 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
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






