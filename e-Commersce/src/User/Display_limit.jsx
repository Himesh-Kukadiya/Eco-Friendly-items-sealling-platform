import { useState } from 'react';
import PropTypes from 'prop-types';

const Display_limit = (props) => {
  const [cart, setCart] = useState([]);
  
  const handleProductClick = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        props.products.map((product, index) => (
          <div key={index} className={`max-w-sm rounded overflow-hidden shadow-lg cursor-pointer ${cart.includes(product) ? 'bg-white' : ''}`} onClick={() => handleProductClick(product)}>
          <img src={product.banner} alt={product.title} className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold mb-2">{product.title}</div>
            <div className="flex items-center">
              <img src="src/assets/Images/Cloud.svg" alt="icon" className="w-6 h-6 mr-2"/>
              <p className="text-sm">17% less carbon emissions</p>
            </div>
            <div className="flex items-center">
              <img src="src/assets/Images/Buttol.svg" alt="icon" className="w-6 h-6 mr-2"/>
              <p className="text-sm">86% less plastic pollution</p>
            </div>
            <p className="text-sm text-left"><b>₹ {product.price}</b></p>
            <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => props.handleClick(product)}
      >
        Add to Cart
      </button>
          </div>
        </div>
        ))
      }
      
    </div>
  );
};

Display_limit.propTypes = {
  products: PropTypes.array,
  handleClick: PropTypes.func.isRequired,
};
export default Display_limit;
