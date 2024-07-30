import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        gender: '',
        color: '',
        ratings: 0,
        subCategory: '',
        sortOrder: 'default' // New filter for sorting order
    });
    const projectId = 'f104bi07c490';
    const location = useLocation();

    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return params.get('query') || '';
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
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
            } finally {
                setLoading(false); // End loading
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

    const handleSortChange = (e) => {
        setFilters({ ...filters, sortOrder: e.target.value });
    };

    useEffect(() => {
        const applyFilters = () => {
            let updatedProducts = products.filter(product => {
                return (
                    (filters.gender === '' || product.gender === filters.gender) &&
                    (filters.color === '' || product.color === filters.color) &&
                    (filters.ratings === 0 || product.ratings >= filters.ratings) &&
                    (filters.subCategory === '' || product.subCategory === filters.subCategory)
                );
            });

            // Apply sorting
            if (filters.sortOrder === 'priceLowToHigh') {
                updatedProducts.sort((a, b) => a.price - b.price);
            } else if (filters.sortOrder === 'priceHighToLow') {
                updatedProducts.sort((a, b) => b.price - a.price);
            }

            setFilteredProducts(updatedProducts);
        };

        applyFilters();
    }, [filters, products]);

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Search Results:</h2>
            <div className="flex flex-wrap mb-8">
                <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0">
                    <label className="block mb-4">
                        Gender:
                        <select name="gender" value={filters.gender} onChange={handleFilterChange} className="block w-full mt-2 p-2 border rounded-md">
                            <option value="">All</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="unisex">Unisex</option>
                        </select>
                    </label>
                    <label className="block mb-4">
                        Color:
                        <input
                            type="text"
                            name="color"
                            value={filters.color}
                            onChange={handleFilterChange}
                            placeholder="Enter color"
                            className="block w-full mt-2 p-2 border rounded-md"
                        />
                    </label>
                    <label className="block mb-4">
                        Rating:
                        <select name="ratings" value={filters.ratings} onChange={handleFilterChange} className="block w-full mt-2 p-2 border rounded-md">
                            <option value={0}>All</option>
                            <option value={1}>1 & up</option>
                            <option value={2}>2 & up</option>
                            <option value={3}>3 & up</option>
                            <option value={4}>4 & up</option>
                            <option value={5}>5</option>
                        </select>
                    </label>
                    <label className="block mb-4">
                        SubCategory:
                        <input
                            type="text"
                            name="subCategory"
                            value={filters.subCategory}
                            onChange={handleFilterChange}
                            placeholder="Enter subCategory"
                            className="block w-full mt-2 p-2 border rounded-md"
                        />
                    </label>
                </div>
                <div className="w-full md:w-3/4 flex flex-col justify-between p-4">
                    <img src="https://static.vecteezy.com/system/resources/previews/006/388/767/non_2x/women-happy-with-shopping-on-mobile-pay-by-credit-card-shopping-online-in-an-online-store-on-a-website-or-mobile-application-concept-loves-shopping-design-for-sale-banner-digital-marketing-vector.jpg" className="w-full rounded-lg shadow-md mb-4" alt="Shopping Banner" />
                    <div className="flex justify-end">
                        <label className="block mb-4">
                            Sort by:
                            <select name="sortOrder" value={filters.sortOrder} onChange={handleSortChange} className="block w-full mt-2 p-2 border rounded-md">
                                <option value="default">Default</option>
                                <option value="priceLowToHigh">Price: Low to High</option>
                                <option value="priceHighToLow">Price: High to Low</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-t-blue-500 border-r-blue-500 border-gray-200 animate-spin rounded-full" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1">
                            <Link to={`/product/${product._id}`} className="block">
                                <img
                                    src={product.displayImage}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <div className="font-bold text-xl mb-2">{product.name}</div>
                                    <div className="text-gray-700">Brand: {product.brand}</div>
                                    <div className="text-gray-900 text-lg font-semibold mt-2">Price: Rs {product.price}</div>
                                    <div className="text-yellow-500 mt-2">Rating: {product.ratings}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchProducts;


















