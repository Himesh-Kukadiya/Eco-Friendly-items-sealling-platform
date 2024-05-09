import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const userData = JSON.parse(localStorage.getItem("UserData"));

const UserProfilePage = () => {
  const [sellerStatus, setSellerStatus] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if(userData) {
      axios
      .post("http://127.0.0.1:7575/sellerStatus", {UId: userData._id})
      .then(() => {
        setSellerStatus(true); 
      })
      .catch(() => {
        setSellerStatus(false)
      });
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Content Area */}
      <div className="flex-1 p-8">
        {/* User Profile Content Goes Here */}
        <h1 className="text-3xl font-bold mb-4">User Profile Page</h1>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-lg mb-4" style={{fontWeight: 'bold'}}>Welcome, {userData.UName}</h1>
          <center>
            <div> 
              <img src={`src/assets/Images/${userData.UImage}`} height={150} width={150} alt="" />
            </div>
            <div className='bg-black p-1 mb-3' style={{width: 400, borderRadius: 10}}> 
              <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 20}}> <i className="material-icons">person</i> </h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Name</h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>{userData.UName}</h1>
            </div>
            <div className='bg-black p-1 mb-3' style={{width: 400, borderRadius: 10}}> 
              <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 20}}> <i className="material-icons">email</i> </h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Email</h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>{userData.UEmail}</h1>
            </div>
            <Link to="/order-history">
              <div className='bg-black p-1 mb-3' style={{width: 400, borderRadius: 10}}> 
                <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 3}}> <i className="material-icons">shopping_basket</i> </h1>
                <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>My Orders</h1>
              </div>
            </Link>
            {!sellerStatus ? 
            <Link to="/sellerRegister">
              <div className='bg-black p-1 mb-3' style={{width: 400, borderRadius: 10}}> 
                <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 3}}> <i className="material-icons">note</i> </h1>
                <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Apply to Selling</h1>
              </div>
            </Link>
            : 
            <Link to="http://localhost:5174/">
              <div className='bg-black p-1 mb-3' style={{width: 400, borderRadius: 10}}> 
                <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 3}}> <i className="material-icons">login</i> </h1>
                <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Login to Seller</h1>
              </div>
            </Link>}
            <Link to="/Login">
              <div className='bg-black p-1 mb-2' style={{width: 400, borderRadius: 10}}> 
                <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 3}}> <i className="material-icons">logout</i> </h1>
                <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Logout</h1>
              </div>
            </Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
