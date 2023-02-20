import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';

const Hero = () => {
  return (
    <>
      <div className="hero-body">
        <div className="hero-cont">
          <h1>YOUR GIVING CHANGES LIVES, FOREVER.</h1>
          <h3>
            Donate <span>&</span> Help
          </h3>
          <p>our mission is to glorify God and loving others</p>

          <Link className="hero-btn" to="/donate">
            Donate Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
