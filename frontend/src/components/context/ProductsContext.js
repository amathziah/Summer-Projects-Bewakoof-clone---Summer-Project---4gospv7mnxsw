import React, { createContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=500", {
          headers: {
            'projectId': 'f104bi07c490'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.data); // Assuming your API response has a 'data' key containing products array
        setIsLoading(false); // Update loading state once data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Log products state whenever it changes
  useEffect(() => {
    //console.log(products);
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, error, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };



