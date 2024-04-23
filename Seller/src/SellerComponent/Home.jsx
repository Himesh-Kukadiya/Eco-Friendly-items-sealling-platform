import React from 'react';

const Home = () => {
  return (
    <div className="">
    <div className="container mx-auto mt-8 text-center mt-14">
      
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Sells</h2>
        <p>$595</p>
        {/* Add link to manage products */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Category</h2>
        <p>5</p>
        {/* Add link to view orders */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total User Purchas</h2>
        <p>15</p>
        {/* Add link to manage profile */}
      </div>
    </div>


    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 mb-20">
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Highest sells Product</h2>
        <p>2</p>
        {/* Add link to manage products */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Lowest Sells Product</h2>
        <p>3</p>
        {/* Add link to view orders */}
      </div>
      <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Total Genrated Revenu</h2>
        <p>$235</p>
        {/* Add link to manage profile */}
      </div>
    </div>
  </div>
    </div>
  );
};

export default Home;
