import React, { useRef } from 'react';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <div className="min-w-xl rounded overflow-hidden shadow-lg m-2 imageee" onClick={handleClick} style={{width:"95%",height:'95%'}}>
            <img className="min-w-full min-h-128 object-cover " src={product.displayImage} alt={product.name} />
            <div className="px-4 py-4">
                <div className="text-gray-900 text-base ">{product.name}</div>
                <p className="text-gray-900 text-base font-bold">{product.price} INR</p>
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
            <h1 className='font-bold text-3xl m-10 text-center'>{title}</h1>
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
