import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddressPage = () => {
  const { sellerIds } = useParams(); // Fetch the sellerId from the URL
  const [orders, setOrders] = useState({}); // Store orders for each seller

  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    if (!sellerIds) return;
    // Initialize orders for the current seller if not already present
    if (!orders[sellerIds]) {
      setOrders(prevOrders => ({
        ...prevOrders,
        [sellerIds]: [],
      }));
    }
  }, [sellerIds, orders]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateOrderId = () => {
    // Generate a unique order ID (you can use a library like uuid for this)
    return Math.random().toString(36).substr(2, 9); // Example: Generating a random string
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = generateOrderId();
    const order = {
      orderId,
      sellerId: sellerIds, // Adding sellerId to the order object
      ...formData,
    };

    // Add the order to the orders list for the current seller
    setOrders(prevOrders => ({
      ...prevOrders,
      [sellerIds]: [...prevOrders[sellerIds], order],
    }));

    // Reset the form data
    setFormData({
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });

    console.log('Submitted Order:', order);
    // You can handle further logic here, like sending the order data to the backend
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Address Details</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2 text-left">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="addressLine1" className="block text-gray-700 font-bold mb-2 text-left">Address Line 1</label>
          <input type="text" id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="addressLine2" className="block text-gray-700 font-bold mb-2 text-left">Address Line 2</label>
          <input type="text" id="addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2 text-left">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-bold mb-2 text-left">State</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700 font-bold mb-2 text-left">ZIP Code</label>
          <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 font-bold mb-2 text-left">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddressPage;
