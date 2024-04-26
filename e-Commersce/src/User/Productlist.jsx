import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryImageSlider from './CategoryImageSlider ';
import PropTypes from 'prop-types';
import axios from 'axios';

const Productlist = (props) => {
  const [products, setProducts] = useState(null); // Initialize products state as null
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

  return (
    <>
      <CategoryImageSlider />
      {products === null ? (
        // Show loader when products are null
        <div className="flex justify-center items-center h-screen" style={{maxHeight: 200}}>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" >
              <img src={product.banner} alt={product.title} className="w-full" />
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
                  onClick={() => props.handleClick(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
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
