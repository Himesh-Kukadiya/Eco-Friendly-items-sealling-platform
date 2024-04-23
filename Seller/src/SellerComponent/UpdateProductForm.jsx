import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductData from '../assets/Product/product';

const UpdateProductForm = () => {
  const { productId } = useParams(); // Fetch productId from URL params
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    brand: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Function to fetch product details by ID
    const fetchProductById = async () => {
      // Find the product in the product data array by ID
      const selectedProduct = ProductData.find(product => product.id === productId);
      if (selectedProduct) {
        // Set product details
        setProduct(selectedProduct);
        // Fetch image file if available
        if (selectedProduct.image) {
          try {
            const response = await fetch(selectedProduct.image); // Assuming image is a URL
            const blob = await response.blob();
            setProduct({ ...product, image: blob });
            setImagePreview(URL.createObjectURL(blob));
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }
      }
    };

    fetchProductById();
  }, [productId]); // Fetch product data whenever productId changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProduct({ ...product, [name]: val });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Create a FileReader instance
    const reader = new FileReader();

    // Listen to the FileReader's load event
    reader.onload = () => {
      // Set the image preview to the result of FileReader
      setImagePreview(reader.result);
    };

    // Read the uploaded file as data URL
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <input type="text" id="name" name="title" value={product.title} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
          <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700">Brand</label>
          <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Product Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 w-full border rounded-md" />
          <img src={product.banner} alt="Product" className="max-w-xs mx-auto" />
        </div>
        {/* Display image preview if available */}
        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt="Product" className="max-w-xs mx-auto" />
          </div>
        )}
        
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
