import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchProducts.css';

const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        gender: '',
        color: '',
        ratings: 0,
        subCategory: '',
    });
    const projectId = 'f104bi07c490';
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
                limit: 500
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
                setProducts(data.data.slice(0, 1000));
                setFilteredProducts(data.data.slice(0, 1000)); // Initial filtered products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [location.search, projectId]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: name === 'color' ? value.toUpperCase() : value, // Convert color to uppercase
        });
    };

    useEffect(() => {
        const applyFilters = () => {
            setFilteredProducts(products.filter(product => {
                return (
                    (filters.gender === '' || product.gender === filters.gender) &&
                    (filters.color === '' || product.color === filters.color) &&
                    (filters.ratings === 0 || product.ratings >= filters.ratings) &&
                    (filters.subCategory === '' || product.subCategory === filters.subCategory)
                );
            }));
        };

        applyFilters();
    }, [filters, products]);

    return (
        <div className="container">
            <h2 className="title">Search Results:</h2>
            <div className="content">
                <div className="filters mb-4">
                    <label>
                        Gender:
                        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="unisex">Unisex</option>
                        </select>
                    </label>
                    <label>
                        Color:
                        <input
                            type="text"
                            name="color"
                            value={filters.color}
                            onChange={handleFilterChange}
                            placeholder="Enter color"
                        />
                    </label>
                    <label>
                        Rating:
                        <select name="ratings" value={filters.ratings} onChange={handleFilterChange}>
                            <option value={0}>All</option>
                            <option value={1}>1 & up</option>
                            <option value={2}>2 & up</option>
                            <option value={3}>3 & up</option>
                            <option value={4}>4 & up</option>
                            <option value={5}>5</option>
                        </select>
                    </label>
                    <label>
                        SubCategory:
                        <input
                            type="text"
                            name="subCategory"
                            value={filters.subCategory}
                            onChange={handleFilterChange}
                            placeholder="Enter subCategory"
                        />
                    </label>
                </div>
                <div className="banner">
                    <img src="https://static.vecteezy.com/system/resources/previews/006/388/767/non_2x/women-happy-with-shopping-on-mobile-pay-by-credit-card-shopping-online-in-an-online-store-on-a-website-or-mobile-application-concept-loves-shopping-design-for-sale-banner-digital-marketing-vector.jpg" style={{width:"50%"}} alt="" />
                </div>
            </div>
            <div className="grid-container">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <Link to={`/product/${product._id}`} className="product-link">
                            <img
                                src={product.displayImage}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-details">
                                <div className="product-name">{product.name}</div>
                                <div className="product-brand">Brand: {product.brand}</div>
                                <div className="product-price">Price: Rs {product.price}</div>
                                <div className="product-rating">Rating: {product.ratings}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchProducts;















