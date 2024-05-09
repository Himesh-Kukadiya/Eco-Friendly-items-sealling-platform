import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductPopup from './ProductPopup';
import CategoryImageSlider from './CategoryImageSlider ';
import Cart from './Cart';
import PropTypes from 'prop-types';
import axios from 'axios';

const isCartOpen = false;
const Productlist = (props) => {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { categoryName } = useParams();

  useEffect(() => {
    axios.get("http://localhost:7575/getProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const filteredProducts = products ? products.filter(product => product.category === categoryName) : [];

  const filteredProductsBySearch = filteredProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <CategoryImageSlider />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      {products === null ? (
        // Show loader when products are null
        <div className="flex justify-center items-center h-screen" style={{maxHeight: 200}}>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProductsBySearch.map((product, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <img src={product.banner} alt={product.title} className="w-full" onClick={() => handleProductClick(product)} />
            <div className="px-6 py-4">
              <div className="font-bold mb-2">{product.title}</div>
              <div className="flex items-center">
                <img src="../src/assets/Images/Cloud.svg" alt="icon" className="w-6 h-6 mr-2" />
                <p style={{ color: "black" }} className="text-sm">17% less carbon emissions</p>
              </div>
              <div className="flex items-center">
                <img src="../src/assets/Images/Buttol.svg" alt="icon" className="w-6 h-6 mr-2" />
                <p style={{ color: "black" }} className="text-sm">86% less plastic pollution</p>
              </div>
              <p style={{ color: "black" }} className="text-sm text-left"><b>₹ {product.price}</b></p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => props.handleClick(product)} // Use addToCart function here
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={handleClosePopup}
          handleClick={props.handleClick}
        />
      )}
      {isCartOpen && (
        <Cart cart={props.cart} setCart={props.setCart} />
      )}
    </>
  );
};

Productlist.propTypes = {
  handleClick: PropTypes.func,
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default Productlist;
