import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryImageSlider from './CategoryImageSlider ';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProductPopup from './ProductPopup copy';
import Cart from './Cart';

const Productlist = (props) => {
  const [products, setProducts] = useState(null); // Initialize products state as null
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Filter products based on the categoryName
  const filteredProducts = products ? products.filter(product => product.category === categoryName) : [];

  const filteredProductsBySearch = filteredProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle closing the product popup
  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle click on a product
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <CategoryImageSlider />
      <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 mt-4 mb-4 border border-gray-300 rounded-md"
        />
      {products === null ? (
        // Show loader when products are null
        <div className="flex justify-center items-center h-screen" style={{maxHeight: 200}}>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProductsBySearch.map((product, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" >
              <img src={product.banner} alt={product.title} className="w-full" />
              <div className="px-6 py-4">
                <div className="font-bold mb-2">{product.title}</div>
                <div className="flex items-center">
                  <img src="../src/assets/Images/Cloud.svg" alt="icon" className="w-6 h-6 mr-2" onClick={(product) => handleProductClick(product)} />
                  <p style={{ color: "black" }} className="text-sm">17% less carbon emissions</p>
                </div>
                <div className="flex items-center">
                  <img src="../src/assets/Images/Buttol.svg" alt="icon" className="w-6 h-6 mr-2" />
                  <p style={{ color: "black" }} className="text-sm">86% less plastic pollution</p>
                </div>
                <p style={{ color: "black" }} className="text-sm text-left"><b>₹ {product.price}</b></p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => props.handleClick(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

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
        </div>
      )}
    </>
  );
};

Productlist.propTypes = {
  handleClick: PropTypes.func,
  cart: PropTypes.array,
  setCart: PropTypes.func
};

export default Productlist;
