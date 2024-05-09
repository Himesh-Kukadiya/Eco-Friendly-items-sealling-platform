import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import axios from 'axios';

const AddressPage = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    mobile: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    status: 'Pending',
    totalAmount: props.price
  });


  // price validation
  useEffect(() => {
    if (props.price === 0) {
      navigate('/cart-view');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { order, orderId } } = await axios.post("http://localhost:7575/makeOrder", { cart: props.cart, customerData: formData });
      const { data: { key } } = await axios.get("http://localhost:7575/getKey");
      
      const options = {
        key: key,
        amount: Number(order.amount),
        currency: "INR",
        name: "EcoS's",
        description: "Pay & Checkout products at your home",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
        order_id: order.id,
        callback_url: `http://localhost:7575/paymentVarify?id=${orderId}`,
        prefill: {
          // contact: localStorage.getItem("UserData").BKMobile,
          contact: "9887766787",
          name: localStorage.getItem("UserData").UName,
          email: localStorage.getItem("UserData").UEmail
        },
        notes: {
          access: "this payment for item order"
        },
        theme: {
          color: "#121212"
        }
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle any errors, such as network issues or server errors
    }
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
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2 text-left">Address </label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2 text-left">Mobile</label>
          <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Procees</button>
        </div>
      </form>
    </div>
  );
};

AddressPage.propTypes = {
  price: PropTypes.number.isRequired,
  cart: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
}

export default AddressPage;
