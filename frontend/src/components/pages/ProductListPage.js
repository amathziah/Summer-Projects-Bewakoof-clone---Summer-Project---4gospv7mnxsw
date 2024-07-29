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
    console.log(gender, category);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=5000", {
                    headers: {
                        'projectId': projectId
                    }
                });
                console.log('API Response:', response);
                console.log(response.data.data);
                const filteredProducts = response.data.data.filter(product => 
                    product.gender === gender && 
                    product.subCategory === category
                );
                setProducts(filteredProducts);
                console.log(filteredProducts);
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
        <div className="product-list">
            <h2>{gender.charAt(0).toUpperCase() + gender.slice(1)} - {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
                        <img src={product.displayImage} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;




