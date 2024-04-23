import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import ProductList from './ProductList';
import productData from '../assets/Product/product'; // Import product data from product.js

const SellerProducts = ({ seller }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching products for the specific seller
    const fetchSellerProducts = () => {
      // Filter productData based on sellerId
      const sellerProducts = productData.filter(product => product.sellerId === seller.sellerId);
      setProducts(sellerProducts);
    };

    fetchSellerProducts();
  }, [seller.sellerId]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seller: {seller.name}</h1>
      <p>Email: {seller.email}</p>
      <p>Location: {seller.location}</p>
      <h2 className="text-xl font-semibold mt-4">Products:</h2>
      <ProductList products={products} />
    </div>
  );
};

// Define prop types for SellerProducts
SellerProducts.propTypes = {
  seller: PropTypes.shape({
    sellerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    // Add more PropTypes for other seller properties as needed
  }).isRequired,
};

export default SellerProducts;
