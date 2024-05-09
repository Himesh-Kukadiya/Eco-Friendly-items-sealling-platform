import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();

  // State variables
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    sellerId: '',
    title: '',
    price: 0,
    category: '',
    description: '',
    images: [],
    banner: "",
    brand: '',
    rate: 0,
    quantity: 0
  });

  // Fetch category names from the server on component mount
  useEffect(() => {
    const sellerData = localStorage.getItem('SellerData');
    if(!sellerData ) {
      navigate('/');
    }
    axios.get("http://localhost:7575/getCategoryNames")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0]; // Get the first selected file
    setProduct({ ...product, [name]: file});
    setImage(file); // Set the image state
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if image is selected
    if (!image) {
      console.log("No image selected.");
      return;
    }

    const sellerData = JSON.parse(localStorage.getItem('SellerData'));
    const sellerId = sellerData._id;
    product.sellerId = sellerId;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("product", JSON.stringify(product));

    axios.post("http://localhost:7575/addProduct", formData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  };


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">

        {/* Product title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Product Title</label>
          <input type="text" id="title" name="title" value={product.title} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md"></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
          <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <select name="category" id="category" value={product.category} onChange={handleChange} className='mt-1 p-2 w-full border rounded-md'>
            <option> Select Category </option>
            {category.map(d => (
              <option key={d + Date.now()} value={d}> {d} </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700">Brand</label>
          <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Product Image</label>
          <input className="mt-1 p-2 w-full border rounded-md" type="file" name="fileUpload" accept="image/*" onChange= {handleFileChange} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
      </form>
      <br />
    </div>
  );
};

export default AddProduct;
