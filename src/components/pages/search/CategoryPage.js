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
                //console.log(data.data)

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
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching data: {error.message}</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Category: {category}</h2>
                    <div className="product-grid">
                        {products.map(product => (
                            <Link key={product._id} to={`/product/${product._id}`} className="product-link">
                                <div className="product-card">
                                    <img src={product.displayImage} alt={product.name} className="product-image" />
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">{product.price} INR</p>
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


