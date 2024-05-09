import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerRegistrationForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errStatus, setErrorStatus] = useState(false);
  const [formData, setFormData] = useState({
    UId: '',
    name: '',
    email: '',
    mobile: '',
    adharno: '',
    about: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(()=> {
    const userData = JSON.parse(localStorage.getItem('UserData'));
    if(userData) {
      const initialData = {
        UId: userData._id,
        name: userData.UName,
        email: userData.UEmail,
        password: userData.UPassword,
        confirmPassword: userData.UPassword,
      }
      setFormData(initialData);
    }
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(false);
    setMessage("");
    if(formData.password === formData.confirmPassword) {
      const sellerData = {
        UId: formData.UId,
        sellername : formData.name,
        selleremail : formData.email,
        mobile : formData.mobile,
        adharno: formData.adharno,
        about: formData.about,
        password: formData.password,
      }
    
    axios
      .post("http://127.0.0.1:7575/sendRequestToSeller", {sellerData})
      .then((response) => {
        setMessage(response.data.message);
        navigate("/Myprofile")
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setErrorStatus(true)
      });
    }
  };

  return (
    <div className="container w-96 mx-auto mt-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Seller Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-left text-sm font-semibold mb-2">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-sm font-semibold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-left text-sm font-semibold mb-2">Mobile Number</label>
            <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="adharno" className="block text-left text-sm font-semibold mb-2">Adhar Number</label>
            <input type="text" id="adharno" name="adharno" value={formData.adharno} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-sm font-semibold mb-2">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-left text-sm font-semibold mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-left text-sm font-semibold mb-2">About</label>
            <textarea id="about" name="about" value={formData.about} onChange={handleChange} rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div>
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Register</button>
          </div>
          <div className={errStatus ? "text-red-600" : "text-green-600"}>
            {message}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
