import React, { useEffect, useState } from 'react';
import ProductCaroseul from './Productcard';
import { useNavigate } from 'react-router-dom';


const categoryImages = {
  hoodie: 'https://images.bewakoof.com/t1080/men-s-black-nasa-graphic-printed-oversized-hoodies-597127-1695640007-1.jpg',
  jeans: 'https://images.bewakoof.com/t1080/men-s-blue-washed-slim-fit-jeans-612412-1692880662-1.jpg',
  jogger: 'https://images.bewakoof.com/t1080/women-s-brown-oversized-casual-pants-589652-1692782198-1.jpg',
  jumpsuit: 'https://images.bewakoof.com/t1080/women-s-orange-jumpsuit-495715-1656163077-1.jpg',
  kurta: 'https://images.bewakoof.com/t1080/men-s-maroon-relaxed-fit-long-kurta-317795-1663931469-1.jpg',
  tshirt: 'https://images.bewakoof.com/t1080/men-s-navy-blue-loki-illusion-graphic-printed-oversized-t-shirt-624546-1696498956-1.jpg',
  shirt: 'https://images.bewakoof.com/t1080/men-s-red-checked-shirt-591789-1683536121-1.jpg',
  shorts: 'https://images.bewakoof.com/t1080/men-s-burgundy-shorts-507378-1670936207-1.jpg',
  sweater: 'https://images.bewakoof.com/t1080/men-s-rolling-hills-solid-sweater-497684-1661496874-1.jpg',
  tracksuit: 'https://images.bewakoof.com/t1080/men-s-beige-black-color-block-tracksuit-560407-1670588233-1.jpg',
  trouser: 'https://images.bewakoof.com/t1080/men-s-maroon-oversized-plus-size-cargo-trousers-aw23csmsscr5569plus-603765-1689593549-1.jpg'
};

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=500", {
          headers: {
            'projectId': 'f104bi07c490'
          }
        });
        const data = await response.json();
        setProductData(data.data);
        console.log(data.data)
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="container mx-auto p-4" >
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <>
          <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {Object.keys(categoryImages).map((category) => (
              <div
                key={category}
                className="category-card cursor-pointer text-center transition-transform duration-300 ease-in-out h-48 relative hover:scale-105 border-2 border-purple-400 rounded-lg"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={categoryImages[category]}
                  alt={category}
                  className="category-image w-full h-full object-cover"
                />
                <div className="category-name absolute inset-0 flex items-center justify-center text-white font-bold bg-black bg-opacity-20">
                  {category}
                </div>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden min-w-full min-h-128">
              <img
                  className="min-w-full min-h-128 object-cover transition-opacity duration-300 ease-in-out "
                  src="https://images.ctfassets.net/wowgx05xsdrr/FuyuOgIBjnHyehF0IR8zY/8109414c34065431d14886a5aad2f60a/Article-Header_Ecommerce_Website.jpg?fm=webp&w=3840&q=75"
                  alt="Banner"
              />
          </div>
          <div className="mt-16 p-4" >
            <ProductCaroseul title="Top Rated Products" products={productData.slice(100,2000).filter(product => product.sellerTag === 'top rated')} />
            <ProductCaroseul title="New Arrivals" products={productData.filter(product => product.sellerTag === 'new arrival')} />
            <div className="banner2">
            <img src="https://static.vecteezy.com/system/resources/previews/002/288/675/non_2x/women-in-fashion-banner-sale-discount-free-vector.jpg" alt="Banner"
            className="" />
            </div>
            <ProductCaroseul title="Best Sellers" products={productData.filter(product => product.sellerTag === 'best seller')} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
