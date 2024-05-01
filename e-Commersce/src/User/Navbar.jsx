import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const userData = JSON.parse(localStorage.getItem("UserData"));
let isLogin = false;
if(userData != null) {
  isLogin = true;
}
const Navbar = ({size,setshow}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="" style={{backgroundColor:"#AEBE98"}}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-bold">  
              <span style={{color: "black"}}>{"Eco"}</span><span style={{color: "red"}}>{"S's"}</span>
            </span>
          </div>
          <div className="hidden md:block mt-3">
            <div className="ml-auto flex items-center space-x-4"> {/* Added ml-auto to push the items to the right */}
              <Link to="/" className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              
              {isLogin ? (
                <Link
                  to="/Myprofile"
                  className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  title="My Profile"
                >
                  <div>
                    {/* Your profile icon SVG */}
                    <h1 className='text-black'> <i className="material-icons" style={{fontSize: 30, color: 'black'}}>person_outline</i> </h1>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/Login"
                  className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  title="Login"
                >
                  <div>
                    {/* Your login icon SVG */}
                    <h1 className='text-black'> <i className="material-icons" style={{fontSize: 30, color: 'black'}}>login</i> </h1>
                  </div>
                </Link>
              )}
              <Link to="/cart-view" className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative" onClick={() => setshow(false)}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 12.57a2 2 0 0 0 1.95 1.43h9.74a2 2 0 0 0 1.95-1.43L23 6H6" stroke="currentColor" strokeWidth="2"></path>
                  </svg>
                  {size > 0 ? <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-white px-2 py-1 text-xs">{size}</span> : null}
                </div>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="text-gray-300 hover:text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/adout" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/terracotta" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            {isLogin ? (
                <Link
                  to="/Myprofile"
                  className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  title="My Profile"
                >
                  <div>
                    {/* Your profile icon SVG */}
                    <svg
                      className="h-8 w-8 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/Login"
                  className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  title="Login"
                >
                  <div>
                    {/* Your login icon SVG */}
                    <svg
                      className="h-8 w-8 text-black"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                    </svg>
                  </div>
                </Link>
              )}
          </div>
        </div>
      )}
    </nav>
  );
  
};
Navbar.propTypes = {
  size: PropTypes.number.isRequired,
  setshow: PropTypes.func.isRequired
};

export default Navbar;
