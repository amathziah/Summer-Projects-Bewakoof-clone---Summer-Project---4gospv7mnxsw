import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchProducts.css';

const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const projectId = 'f104bi07c490'; // Replace with your actual project ID
    const location = useLocation();

    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return params.get('query') || '';
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const searchQuery = getQueryParams(location.search);
            const url = 'https://academics.newtonschool.co/api/v1/ecommerce/clothes/products';
            const queryParams = new URLSearchParams({ 
                search: JSON.stringify({ name: searchQuery }),
                limit: 1000  // Limiting the number of products fetched
            });

            try {
                const response = await fetch(`${url}?${queryParams}`, {
                    headers: {
                        'projectId': projectId
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data.data.slice(0, 1000)); // Limiting products to 1000 items
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [location.search, projectId]);

    return (
        <div className="container">
            <h2 className="title">Search Results:</h2>
            <div class="banner">
                <img src="https://static.vecteezy.com/system/resources/previews/006/388/767/non_2x/women-happy-with-shopping-on-mobile-pay-by-credit-card-shopping-online-in-an-online-store-on-a-website-or-mobile-application-concept-loves-shopping-design-for-sale-banner-digital-marketing-vector.jpg" alt="" />
            </div>
            <div className="grid-container">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <Link to={`/product/${product._id}`} className="product-link">
                            <img
                                src={product.displayImage}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-name">{product.name}</div>
                            <div className="product-brand">Brand: {product.brand}</div>
                            <div className="product-price">Price: ${product.price}</div>
                            <div className="product-rating">Rating: {product.ratings}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchProducts;










