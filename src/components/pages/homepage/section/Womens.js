import React, { useState, useEffect ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Womens.css';
import { ProductsContext } from '../../../context/ProductsContext';
const Womens = () => {
    const [womensProducts, setWomensProducts] = useState([]);
    const projectId = 'f104bi07c490'; // Replace with your actual project ID
    const products = useContext(ProductsContext);
    //console.log(products)
    //const womenProducts = products.filter(product => product.gender === 'Women');

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
            }
        };

        fetchWomensProducts();
    }, [projectId]);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="womens-container" style={{marginTop:"2%"}}>
            <h2 className="title">Women's Products</h2>
            <div className="banner" style={{width:"50%"}}>
                <img src="https://marketplace.canva.com/EAE2DGluFHc/1/0/1600w/canva-pink-and-blue-modern-minimalist-special-offer-promotion-banner-G8TnrO1SWD0.jpg" alt="" />
            </div>
            <div className="grid-container">
                {womensProducts.map(product => (
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

export default Womens;

