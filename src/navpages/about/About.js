import React from 'react';
import './about.css';
// import { AiFillInstagram } from 'react-icons/ai';
// import { FaFacebookF, FaTiktok, FaTwitter } from 'react-icons/fa';
// import lovers from '../../img/lovers.jpg';
import charity from '../../img/charity.jpg';
// import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 lg:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12">
              <img src={charity} className="w-96" alt="banner" loading="lazy" width="" height="" />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">Lovers of God International Foundation-LOGIF <br /> 
                (Non Governmental Org)
              </h2>
              <p className="mt-6 text-gray-600">
                Welcome to Lovers of God International Foundation (LOGIF), a non-governmental
                organization committed to bringing lovers of God together, improving the welfare of
                members, empowering the less privileged in the society, providing social amenities
                to the community, and preaching the Gospel of our Lord and Saviour Jesus Christ both
                locally and internationally.
              </p>
              <p className="mt-6 text-gray-600">
                Our aim is to create a platform for individuals to come together and
                experience the love of God. We believe in the power of community and strive to
                foster a spirit of love, compassion, and unity among our members. At LOGIF,
                we believe that everyone deserves to experience the love of God, regardless
                of their race, gender, or socio-economic status.
              </p>
              <p className="mt-6 text-gray-600">
                Our objectives are to improve the welfare of our members, empower the less
                privileged in the society, and provide social amenities to the community.
                We are committed to making a positive impact in the lives of those we serve.
                We believe that by providing opportunities for education, health, and economic
                empowerment, we can help individuals and communities thrive.
              </p>
              <p className="mt-6 text-gray-600">
                Our objectives are to improve the welfare of our members, empower the less
                privileged in the society, and provide social amenities to the community.
                We are committed to making a positive impact in the lives of those we serve.
                We believe that by providing opportunities for education, health, and economic
                empowerment, we can help individuals and communities thrive.
              </p>
              <p className="mt-6 text-gray-600">
                Thank you for visiting our website. We invite you to join us in our mission to
                spread the love of God and make a positive impact in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
