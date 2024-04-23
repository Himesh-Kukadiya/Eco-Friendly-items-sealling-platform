import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ product, handleClick }) => {
  const { title, description, banner, price } = product;

  return (
  
    <div className="container mx-auto px-4" style={{display:"inline-flex"}}>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      
    
      <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
        <img src={banner} alt={title} className="w-full" />
        <div className="px-6 py-4">
          <div className="font-bold mb-2">{title}</div>
          <div className="flex items-center">
            <img src="../assets/Images/Cloud.svg" alt="icon" className="w-6 h-6 mr-2" />
            <p style={{ color: "black" }} className="text-sm">17% less carbon emissions</p>
          </div>
          <div className="flex items-center">
            <img src="src/assets/Images/Buttol.svg" alt="icon" className="w-6 h-6 mr-2" />
            <p style={{ color: "black" }} className="text-sm">86% less plastic pollution</p>
          </div>
          <p style={{ color: "black" }} className="text-sm text-left"><b>₹ {price}</b></p>
        </div>
        <div>
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleClick(product)}
      >
        Add to Cart
      </button>
        </div>
      </div>
    
    </div>
    </div>

  );
};

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Card;
