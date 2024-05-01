import { useNavigate, Link } from 'react-router-dom';

const userData = JSON.parse(localStorage.getItem("UserData"));

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleOrderHistoryClick = () => {
    // Navigate to the order history page
    navigate('/order-history');
  };

  const handleSellerRegistrationClick =() =>{
    // Navigate to the seller registration page
    navigate('/sellerRegister');
  }

  const handleLogoutClick = () => {

    navigate('/Login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Vertical Menu */}
      <div className="flex flex-col justify-start items-center bg-gray-200 w-1/4 py-8">
        <button
          onClick={handleOrderHistoryClick}
          className="py-2 px-4 rounded-md text-gray-800 hover:bg-gray-300 hover:text-gray-900 mb-4 w-full"
        >
          Order History
        </button>

        <button
          onClick={handleSellerRegistrationClick}
          className="py-2 px-4 rounded-md text-gray-800 hover:bg-gray-300 hover:text-gray-900 mb-4 w-full"
        >
          Seller Registration
        </button>

        <button
          onClick={handleLogoutClick}
          className="py-2 px-4 rounded-md text-gray-800 hover:bg-gray-300 hover:text-gray-900 w-full"
        >
          Logout
        </button>
      </div>

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
            <div className='bg-black p-1 mb-2' style={{width: 400, borderRadius: 10}}> 
              <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 20}}> <i className="material-icons">person</i> </h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Name</h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>{userData.UName}</h1>
            </div>
            <div className='bg-black p-1 mb-2' style={{width: 400, borderRadius: 10}}> 
              <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 20}}> <i className="material-icons">email</i> </h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Email</h1>
              <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>{userData.UEmail}</h1>
            </div>
            <Link to="/Login">
              <div className='bg-black p-1 mb-2' style={{width: 400, borderRadius: 10}}> 
                <h1 className='text-white text-left ml-2' style={{position: 'absolute', marginTop: 3}}> <i className="material-icons">logout</i> </h1>
                <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>Logout</h1>
                {/* <h1 className="text-lg text-white text-left ml-12" style={{fontWeight: 'bold'}}>{userData.UEmail}</h1> */}
              </div>
            </Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
