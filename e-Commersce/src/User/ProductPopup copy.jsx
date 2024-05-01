import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

const ProductPopup = ({ product, onClose, handleClick }) => {
  // const navigate = useNavigate(); // Hook for navigation

  // Function to handle adding product to cart and closing the popup
  const handleAddToCart = () => {
    handleClick(product); // Call the handleClick function to add product to cart
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
      
      {/* Popup content */}
      <div className="relative bg-white p-8 max-w-md rounded-lg shadow-lg">
        {/* Close button */}
        <button className="absolute top-0 right-0 p-2 text-lg" onClick={onClose}>×</button>
        
        {/* Product details */}
        <img src={product.banner} alt={product.title} className="w-full h-auto" />
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description.substring(0, 100)}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price: ₹{product.price}</span>
          
          {/* Add to Cart button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToCart} // Call handleAddToCart function on click
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductPopup.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired, // Function to handle adding product to cart
};

export default ProductPopup;
