import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredProductsBySearch = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProductsBySearch.map((product, index) => (
          // <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={() => handleProductClick(product)}>
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <img src={product.banner} alt={product.title} className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold mb-2">{product.title}</div>
              <div className="flex items-center">
                <img src="src\assets\Images\Cloud.svg" alt="icon" className="w-6 h-6 mr-2" />
                <p style={{ color: "black" }} className="text-sm">17% less carbon emissions</p>
              </div>
              <div className="flex items-center">
                <img src="src/assets/Images/Buttol.svg" alt="icon" className="w-6 h-6 mr-2" />
                <p style={{ color: "black" }} className="text-sm">86% less plastic pollution</p>
              </div>
              <p style={{ color: "black" }} className="text-sm text-left"><b>₹ {product.price}</b></p>
              
              <div className="flex justify-center">
                <Link to={`/updateproduct/${product._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Product
                  </button>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductList;
