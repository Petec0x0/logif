import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './hero.css';
import bg_img_1 from 'img/orphan.jpg';
import bg_img_2 from 'img/help.jpg';
import bg_img_3 from 'img/hero-2.jpg';
import bg_img_4 from 'img/lovers.jpg';
import bg_img_5 from 'img/hero.jpg';

const bg_images = [bg_img_1, bg_img_2, bg_img_3, bg_img_4, bg_img_5];

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState(bg_images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = Math.floor(Math.random() * bg_images.length);
      setBackgroundImage(bg_images[index]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
      <div className="hero-body" style={{ backgroundImage: `linear-gradient(rgba(9, 5, 54, 0.3), rgba(5, 4, 46, 0.7)), url(${backgroundImage})` }}>
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
