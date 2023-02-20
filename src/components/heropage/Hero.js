import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';

const Hero = () => {
  return (
    <>
      <div className="hero-body">
        <div className="hero-cont">
          <h1>Your Donation Can Help Empower and Transform Lives</h1>
          <h3>
            Donate <span>&</span> Help
          </h3>
          <p className="text-justify text-lg mx-4 md:mx-20 lg:mx-48">
            Our mission at Lovers of God International Foundation (LOGIF) is to empower 
            individuals and communities through education, health, and economic programs, 
            while fostering a spirit of love, compassion, and unity among our members. 
            We are committed to creating a platform for people to come together and experience 
            the love of God, and to spread the Gospel of our Lord and Saviour Jesus Christ both 
            locally and internationally. We believe in the power of community and the positive impact 
            we can make by providing opportunities for the less privileged to thrive and have access 
            to social amenities, resulting in a brighter future for all
          </p>

          <Link className="hero-btn" to="/donate">
            Donate Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
