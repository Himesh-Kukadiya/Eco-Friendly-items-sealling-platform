import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productlist from './User/Productlist';
import Home from './User/Home'
import Footer from './User/Footer';
import AboutPage from './User/AboutPage';
import SellerRegistrationForm from './User/SellerRegistrationForm';
import Navbar from './User/Navbar';
import { useEffect, useState } from 'react';
import AddressPage from './User/AddressPage';
import Cart from './User/Cart';
import LoginForm from './User/LoginForm';
import RegistrationForm from './User/RegistrationForm';
import axios from 'axios';
import OtpVarification from './User/OtpVarification';
import UserProfilePage from './User/UserProfilePage';
import OrderHistory from './User/OrderHistory';

function App() {
  const [userData, setUserData] = useState({});
  const [userId, setuserId] = useState();
  const [otp, setOtp] = useState("");
  const [newUser, setNewUser] = useState({});
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0); // for cart
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('UserData');
    if(userData) {
      const data = JSON.parse(userData);
      setUserData(data);
    }
  }, [])

  useEffect(() => {
    const UId = userData._id;
    setuserId(UId);
  }, [userData])

  useEffect(() => {
    if(userId != null) {
      axios
      .post("http://localhost:7575/findCartList", {userId})
      .then((response) => {
        setCart(response.data)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }
    
  }, [userId])

  const handleClick = (item) => {
    // Check if the item is already in the cart
    const isPresent = cart.some(product => product.P_id === item._id);
    
    if (isPresent) {
      // Display warning message if the item is already in the cart
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    } else {
      // create new Item object to add into cart
      const newItem = {
        P_id: item._id,
        sellerId: item.sellerId,
        U_id: userData._id,
        title: item.title,
        banner: item.banner,
        price: item.price,
        quantity: 1
      }

      axios
        .post('http://localhost:7575/addToCart', newItem)
        .then((res) => {
          console.log(res.data.message);
          // If the item is not already in the cart, add it to the cart
          setCart([...cart, res.data.newItem]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Router>
        <Navbar size={cart.length} show={show} setshow={setShow} />
        {
          warning && (
            <div className="fixed top-0 right-0 mt-4 mr-4 p-4 rounded-lg shadow-lg text-white bg-red-500">
              Item already in your cart...
            </div>
          )
        }
        <Routes>
          <Route path="/" element={<Home handleClick={handleClick} />} />
          <Route path="/emailVarification" element={ <OtpVarification otp={otp} userData={newUser} setOtp={setOtp} /> } />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />
          <Route path="/category/:categoryName" element={<Productlist handleClick={handleClick} cart={cart} setCart={setCart}/>} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/category/:categoryName" element={<Productlist />} />
          <Route path="/sellerRegister" element={<SellerRegistrationForm />} />
          <Route path="/sellerRegister" element={<SellerRegistrationForm />} />

          <Route path="/cart-view" element={<Cart cart={cart} setCart={setCart} price={price} setPrice={setPrice} />} />
          <Route path="/address" element={<AddressPage price={price} cart={cart} userId={userId ?? ""} />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm setOtp={setOtp} setNewUser={setNewUser} />} />
          <Route path="/Myprofile" element={<UserProfilePage />} />
          <Route path="/order-history" element={<OrderHistory UId={userId} />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
