import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="" style={{backgroundColor:"#AEBE98"}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <NavLink to="/" className="text-white text-xl font-bold">Home</NavLink>
          </div>
          <div className="block sm:hidden">
            <button onClick={toggleNavbar} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className={`sm:flex flex-col sm:flex-row ${isOpen ? 'block' : 'hidden'}`}>
            <NavLink to="/product" activeClassName="text-blue-300" className="text-white hover:text-blue-700 py-2 px-4 block sm:mx-2">Add Products</NavLink>
            <NavLink to="/Manageorders" activeClassName="text-blue-300" className="text-white hover:text-blue-700 py-2 px-4 block sm:mx-2">Manage Orders</NavLink>
            <NavLink to="/ManageProducts" activeClassName="text-blue-300" className="text-white hover:text-blue-700 py-2 px-4 block sm:mx-2">Manage Product</NavLink>
            <NavLink to="/logout" activeClassName="text-blue-300" className="text-white hover:text-blue-700 py-2 px-4 block sm:mx-2">Logout</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
