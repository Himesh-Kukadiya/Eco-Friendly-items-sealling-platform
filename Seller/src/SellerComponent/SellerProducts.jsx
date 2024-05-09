import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const sellerData = JSON.parse(localStorage.getItem('SellerData'));
const SellerProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(!sellerData) {
      navigate('/');
    }
    else {
      const sellerId = sellerData._id;
      axios.post("http://localhost:7575/getSellerProducts", {sellerId})
      .then((response) => {
        setProducts(response.data.sellerProducts);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }
  }, []);


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seller: {sellerData.sellername}</h1>
      <p>Email: {sellerData.selleremail}</p>
      <p>Mobile: {sellerData.mobile}</p>
      <br />
      <ProductList products={products} />
    </div>
  );
};

export default SellerProducts;
