import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductListPage = () => {
    const { gender, category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const projectId = 'f104bi07c490';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=5000", {
                    headers: {
                        'projectId': projectId
                    }
                });
                const filteredProducts = response.data.data.filter(product => 
                    product.gender === gender && 
                    product.subCategory === category
                );
                setProducts(filteredProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [gender, category]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="product-list p-4">
            <h2 className="text-2xl font-bold mb-4">
                {gender.charAt(0).toUpperCase() + gender.slice(1)} - {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div 
                        key={product._id} 
                        className="product-item bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => handleProductClick(product._id)}
                    >
                        <div className="relative w-full h-64">
                            <img 
                                src={product.displayImage} 
                                alt={product.name} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 hover:text-blue-500">{product.name}</h3>
                            <p className="text-gray-900 font-semibold">Price: Rs {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;







