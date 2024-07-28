// Mens.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Mens = () => {
    const [mensProducts, setMensProducts] = useState([]);
    const projectId = 'f104bi07c490'; // Replace with your actual project ID
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            let url = 'https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=500';
            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }

            try {
                const response = await fetch(url, {
                    headers: {
                        'projectId': projectId
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                const mensProducts = data.data.filter(product => product.gender === 'Men');
                setMensProducts(mensProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [projectId, selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const topCategories = [
        { name: 'Topwear', categories: ['hoodie', 'Jumpsuits', 'Shirts', 'Kurtas', 'Sweaters', 'T-Shirts'] },
        { name: 'Bottomwear', categories: ['Joggers', 'Jeans', 'Shorts', 'Track Suits', 'Trousers'] },
    ];

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold">Topwear</h3>
                            <div className="space-y-2 mt-2">
                                {topCategories.find(category => category.name === 'Topwear').categories.map((category, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full text-left text-sm text-gray-600 hover:text-gray-800"
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Bottomwear</h3>
                            <div className="space-y-2 mt-2">
                                {topCategories.find(category => category.name === 'Bottomwear').categories.map((category, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full text-left text-sm text-gray-600 hover:text-gray-800"
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className="overflow-hidden rounded-lg">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7bb49d2a-8588-41e7-9081-342339bfb37d/ddl95sj-4f2dc038-52f4-4369-8ce2-977c63d427eb.jpg/v1/fill/w_1024,h_284,q_75,strp/men_s_fashion__banner_by_asimcarnage_ddl95sj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdiYjQ5ZDJhLTg1ODgtNDFlNy05MDgxLTM0MjMzOWJmYjM3ZFwvZGRsOTVzai00ZjJkYzAzOC01MmY0LTQzNjktOGNlMi05NzdjNjNkNDI3ZWIuanBnIiwiaGVpZ2h0IjoiPD0yODQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC83YmI0OWQyYS04NTg4LTQxZTctOTA4MS0zNDIzMzliZmIzN2RcL2FzaW1jYXJuYWdlLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.ktKYKsraKd0YmHxi2mHLJfVcWFbkYW687jM82VjT2sU" alt="Men's Fashion" className="w-full h-auto object-cover" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {mensProducts.map(product => (
                            <div
                                key={product._id}
                                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                                onClick={() => handleProductClick(product._id)}
                            >
                                <img
                                    src={product.displayImage}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-2 rounded-md"
                                />
                                <div className="text-lg font-semibold">{product.name}</div>
                                <div className="text-gray-600">Brand: {product.brand}</div>
                                <div className="text-gray-800 font-bold">Price: ${product.price}</div>
                                <div className="text-yellow-500">Rating: {product.ratings}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mens;

















