import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mens.css';

const Mens = () => {
    const [mensProducts, setMensProducts] = useState([]);
    const projectId = 'f104bi07c490'; // Replace with your actual project ID
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const url = 'https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=500';

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
                console.log(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [projectId]);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="mens-container">
            <h2 className="title">Men's Products</h2>
            <div class="banner">
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7bb49d2a-8588-41e7-9081-342339bfb37d/ddl95sj-4f2dc038-52f4-4369-8ce2-977c63d427eb.jpg/v1/fill/w_1024,h_284,q_75,strp/men_s_fashion__banner_by_asimcarnage_ddl95sj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdiYjQ5ZDJhLTg1ODgtNDFlNy05MDgxLTM0MjMzOWJmYjM3ZFwvZGRsOTVzai00ZjJkYzAzOC01MmY0LTQzNjktOGNlMi05NzdjNjNkNDI3ZWIuanBnIiwiaGVpZ2h0IjoiPD0yODQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC83YmI0OWQyYS04NTg4LTQxZTctOTA4MS0zNDIzMzliZmIzN2RcL2FzaW1jYXJuYWdlLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.ktKYKsraKd0YmHxi2mHLJfVcWFbkYW687jM82VjT2sU" alt="" />
            </div>
            <div className="grid-container">
                {mensProducts.map(product => (
                    <div 
                        key={product._id} 
                        className="product-card" 
                        onClick={() => handleProductClick(product._id)}
                    >
                        <img
                            src={product.displayImage}
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-name">{product.name}</div>
                        <div className="product-brand">Brand: {product.brand}</div>
                        <div className="product-price">Price: ${product.price}</div>
                        <div className="product-rating">Rating: {product.ratings}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mens;




