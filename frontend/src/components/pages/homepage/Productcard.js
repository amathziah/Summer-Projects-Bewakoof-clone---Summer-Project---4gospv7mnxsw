import React, { useRef } from 'react';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product._id}`);
    };

    return(
<div
    className="w-full max-w-xs rounded overflow-hidden shadow-lg m-4 transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105"
    onClick={handleClick}
    style={{ height: '80%' }}
>
    <div className="relative overflow-hidden bg-gray-100">
        <img
            className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:opacity-90 hover:scale-105"
            src={product.displayImage}
            alt={product.name}
        />
    </div>
    <div className="p-4">
        <div className="mt-4 text-blue-50 font-semibold text-gray-900">{product.name}</div>
        <p className="mt-2 text-red-600 font-bold hover:text-blue-600">{product.price} INR</p>
    </div>
</div>

    );
};

const ProductCaroseul = ({ title, products }) => {
    const carouselRef = useRef(null);

    const handleMouseEnter = () => {
        if (carouselRef.current) {
            carouselRef.current.stopAutoplay();
        }
    };

    const handleMouseLeave = () => {
        if (carouselRef.current) {
            carouselRef.current.startAutoplay();
        }
    };

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    return (
        <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h1 className="font-bold text-3xl m-10 text-center">{title}</h1>
            <Carousel
                value={products}
                numVisible={6}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                className="custom-carousel"
                circular
                autoplayInterval={10000}
                itemTemplate={(product, options) => (
                    <ProductCard product={product} />
                )}
                ref={carouselRef}
            />
        </div>
    );
};

export default ProductCaroseul;

