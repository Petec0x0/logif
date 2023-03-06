import React, { useEffect, useState } from 'react';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import bg_img_1 from 'img/donate-bg.jpg';
import bg_img_2 from 'img/hero-2.jpg';
import bg_img_3 from 'img/hero-3.jpg';
import bg_img_4 from 'img/hero-4.jpg';
import bg_img_5 from 'img/hero-5.jpg';
import charity from 'img/charity.jpg';
import { Link } from 'react-router-dom';

const bg_images = [bg_img_1, bg_img_2, bg_img_3, bg_img_4, bg_img_5];

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(bg_images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = Math.floor(Math.random() * bg_images.length);
      setBackgroundImage(bg_images[index]);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="">
                <h1 className="text-white font-semibold text-3xl">
                  This is the Lovers Of God International Foundation
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Where the love of God, Jesus Christ and the Holy Spirit is fully given to the less privileged in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 py-10 text-center">
        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl font-bold text-gray-800 lg:text-4xl">Your Donation Can Help Empower and Transform Lives</h1>
          <p className="mt-6 text-gray-500 ">
            Our mission at Lovers of God International Foundation (LOGIF) is to empower
            individuals and communities through education, health, and economic programs,
            while fostering a spirit of love, compassion, and unity among our members.
            We are committed to creating a platform for people to come together and experience
            the love of God, and to spread the Gospel of our Lord and Saviour Jesus Christ both
            locally and internationally. We believe in the power of community and the positive impact
            we can make by providing opportunities for the less privileged to thrive and have access
            to social amenities, resulting in a brighter future for all
          </p>
          <button className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto">
            <Link to="/donate">
              Donate Now
            </Link>
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <img alt="???" className="h-96 w-full rounded-xl object-cover lg:w-4/5" src={charity} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
