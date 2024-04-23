  import './App.css'
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Productlist from './User/Productlist';
  import Home from './User/Home'

  import Footer from './User/Footer';
  import AboutPage from './User/AboutPage';
  import SellerRegistrationForm from './User/SellerRegistrationForm';
  import Navbar from './User/Navbar';
  import { useState } from 'react';
  import AddressPage from './User/AddressPage';
  import Cart from './User/Cart';
  import products from './assets/Product/product';

  function App() {
    

    const [show,setShow] = useState(true);
    const [cart,setCart] =useState([]);
    const [warning,setWarning] = useState(false);

    const handleClick = (item) => {
      // Check if the item is already in the cart
      const isPresent = cart.some(product => product.id === item.id);
  
      if (isPresent) {
          // Display warning message if the item is already in the cart
          setWarning(true);
          setTimeout(() => {
              setWarning(false);
          }, 2000);
      } else {
          // If the item is not already in the cart, add it to the cart
          setCart([...cart, item]);
      }
  };
  


    return (
      <>
        <Router>
      <Navbar size={cart.length} setshow={setShow}/>
      {
        warning && (
          <div className="fixed top-0 right-0 mt-4 mr-4 p-4 rounded-lg shadow-lg text-white bg-red-500">
          Item already in your cart...
      </div>
        )
    }
        <Routes>
          <Route path="/" element={<Home handleClick={handleClick}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick}  />} />
        
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category/:categoryName" element={<Productlist/>} />
          <Route path="/sellerRegister" element={<SellerRegistrationForm/>}/>
          
          <Route path="/cart-view" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/address" element={<AddressPage/>}/>
        </Routes>
        <Footer/>
      </Router>
      
      </>
    )
  }

  export default App
