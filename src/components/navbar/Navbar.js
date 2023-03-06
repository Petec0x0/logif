import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//import './nav.css';
import logo from '../../img/logif-min.png';

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // const handleclick = () => setClick(!click);
  const toggleMobileMenu = () => setMobileNavOpen(!mobileNavOpen);
  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4">
        <nav className="flex-wrap lg:flex items-center">
          <div className="flex items-center justify-between mb-3 mt-1">
            <img className="w-44 h-20" src={logo} alt="Logo" />

            <button onClick={toggleMobileMenu} className="lg:hidden w-10 h-10 ml-auto flex items-center justify-center border border-primary text-primary rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          <ul className={`lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-2 xl:space-x-3 ${mobileNavOpen ? 'flex' : 'hidden'}`}>
            <li className="font-bold text-sm text-gray-900 hover:text-primary transition ease-in-out duration-300 mb-5 lg:mb-0">
              <Link className="font-bold" to="/">Home</Link>
            </li>
            <li className="font-bold text-sm text-gray-900 hover:text-primary transition ease-in-out duration-300 mb-5 lg:mb-0">
              <Link className="font-bold" to="/donate">Donate</Link>
            </li>
            <li className="font-bold text-sm text-gray-900 hover:text-primary transition ease-in-out duration-300 mb-5 lg:mb-0">
              <Link className="font-bold" to="/membership">Partnership</Link>
            </li>
            <li className="font-bold text-sm text-gray-900 hover:text-primary transition ease-in-out duration-300 mb-5 lg:mb-0">
              <Link className="font-bold" to="/about">About us</Link>
            </li>
            <li className="font-bold text-sm text-gray-900 hover:text-primary transition ease-in-out duration-300 mb-5 lg:mb-0">
              <Link className="font-bold" to="/contact">Contact us</Link>
            </li>
            <li className="font-bold text-sm text-gray-900 hover:text-primary transition ease-in-out duration-300 mb-5 lg:mb-0">
              <Link className="font-bold" to="/media">Media</Link>
            </li>
          </ul>

          <div className={`lg:flex mb-2 flex-col md:flex-row md:items-center text-center md:space-x-6 ${mobileNavOpen ? 'flex' : 'hidden'}`}>
            <a href="/membership" className="px-6 py-4 border-2 border-primary text-primary font-semibold text-lg rounded-xl hover:bg-primary hover:text-white transition ease-linear durablue-bg-primary">Become a partner</a>
            <a href="/member/login" className="px-6 py-4 bg-primary text-white font-semibold text-lg rounded-xl hover:bg-primary transition ease-in-out durablue-bg-primary mb-5 md:mb-0">Login</a>
          </div>
        </nav >
      </div>
    </>
  );
};

export default Navbar;
