import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CategoryPage.css'; // Import the CSS file

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=5000`, {
                    headers: {
                        'projectId': 'f104bi07c490'
                    }
                });
                const data = await response.json();
                setProducts(data.data.filter(product => product.subCategory === category));
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [category]);

    return (
        <div className="container mx-auto p-4">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error fetching data: {error.message}</p>
            ) : (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-center">Category: {category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <Link key={product._id} to={`/product/${product._id}`} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105">
                                <img src={product.displayImage} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm">{product.price} INR</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryPage;



