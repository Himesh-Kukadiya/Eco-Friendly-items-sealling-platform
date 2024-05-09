import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();

  const [totals, setTotals] = useState({});
  useEffect(() => {
    const sellerData = JSON.parse(localStorage.getItem("SellerData"));
    if(!sellerData) {
      navigate("/");
    }
    else {
      const getTotals = async () => {
        const response = await axios.post("http://127.0.0.1:7575/getTotals", { _id: sellerData._id });
        const totals = {
          totalProducts: response.data.totalProducts,
          totalOrders: response.data.totalOrders,
          totalCategories: response.data.totalCategories,
          totalUsers: response.data.totalUsers,
          totalStock: response.data.totalStock,
          totalGenaratedRevanue: response.data.totalGenaratedRevanue,
        }
        setTotals(totals);
      }
      getTotals();

    }
  }, [])
  return (
    <div className="">
    <div className="container mx-auto mt-8 text-center mt-14">
      
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Orders</h2>
        <p> {totals.totalOrders} </p>
        {/* Add link to manage products */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Users</h2>
        <p> {totals.totalUsers} </p>
        {/* Add link to view orders */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Genrated Revenu</h2>
        <p> ₹ {totals.totalGenaratedRevanue} </p>
        {/* Add link to manage profile */}
      </div>
    </div>


    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 mb-20">
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Product</h2>
        <p> {totals.totalProducts} </p>
        {/* Add link to manage products */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Category</h2>
        <p> {totals.totalCategories} </p>
        {/* Add link to view orders */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Stock</h2>
        <p> {totals.totalStock} </p>
        {/* Add link to manage profile */}
      </div>
    </div>
  </div>
    </div>
  );
};

export default Home;
