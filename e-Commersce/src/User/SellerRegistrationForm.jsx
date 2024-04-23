import { useState } from 'react';

const SellerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    about: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
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
            <label htmlFor="password" className="block text-left text-sm font-semibold mb-2">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-left text-sm font-semibold mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-left text-sm font-semibold mb-2">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-left text-sm font-semibold mb-2">About</label>
            <textarea id="about" name="about" value={formData.about} onChange={handleChange} rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" required />
          </div>
          <div>
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
