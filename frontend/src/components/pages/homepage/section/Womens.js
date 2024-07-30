// Womens.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../../context/ProductsContext';

const Womens = () => {
    const [womensProducts, setWomensProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const projectId = 'f104bi07c490'; // Replace with your actual project ID
    const products = useContext(ProductsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWomensProducts = async () => {
            const url = 'https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=500';
            const queryParams = new URLSearchParams({
                search: JSON.stringify({ gender: 'women' })
            });

            try {
                const response = await fetch(`${url}&${queryParams}`, {
                    headers: {
                        'projectId': projectId
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setWomensProducts(data.data);
            } catch (error) {
                console.error('Error fetching women’s products:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchWomensProducts();
    }, [projectId]);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="container mx-auto p-4 mt-4">
            <h2 className="text-2xl font-bold mb-4">Women's Products</h2>
            <div className="mb-6">
                <img
                    src="https://marketplace.canva.com/EAE2DGluFHc/1/0/1600w/canva-pink-and-blue-modern-minimalist-special-offer-promotion-banner-G8TnrO1SWD0.jpg"
                    alt="Women's Sale Banner"
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            {loading ? (
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-t-blue-500 border-r-blue-500 border-gray-200 animate-spin rounded-full" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {womensProducts.map(product => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleProductClick(product._id)}
                        >
                            <img
                                src={product.displayImage}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-2 rounded-md"
                            />
                            <div className="text-lg font-semibold mb-1">{product.name}</div>
                            <div className="text-gray-600 mb-1">Brand: {product.brand}</div>
                            <div className="text-gray-800 font-bold mb-1">Price: ${product.price}</div>
                            <div className="text-yellow-500">Rating: {product.ratings}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Womens;



