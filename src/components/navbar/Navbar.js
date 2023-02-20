import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTimes,
  FaTwitter,
} from 'react-icons/fa';
import './nav.css';
import { NavMenuList } from './NavData';
import logo from '../../img/logif-min.png';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleclick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <nav>
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      {/* For the mobile icons */}
      <div className="ham-menu" onClick={handleclick}>
        {click ? <FaTimes /> : <FaBars />}
      </div>
      {/* For the nav menu */}
      <div>
        <ul className={click ? 'menu-list active' : 'menu-list'}>
          {NavMenuList.map((menu, key) => {
            return (
              <li key={key} className="menu-items">
                <Link
                  className="menu-link"
                  //   onClick={closeMobileMenu}
                  to={menu.link}
                >
                  {menu.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* for the social icons */}
      <div className="nav-soc">
        <a
          href="https://twitter.com/cojimofficiel"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://web.facebook.com/ChristopherOrjiMinistriesCOJIM?_rdc=1&_rdr"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/cojimofficiel/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
