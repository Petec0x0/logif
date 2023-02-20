import React from 'react';
import './about.css';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF, FaTiktok, FaTwitter } from 'react-icons/fa';
import lovers from '../../img/lovers.jpg';
// import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="ab-sub">
        <h2>About Us</h2>
      </div>
      {/* For the body */}
      <div className="logif-body">
        <div className="logif-img">
          <img src={lovers} alt="logif" />
          <div className="about-socio icons">
            <a
              target="_blank"
              href="https://web.facebook.com/ChristopherOrjiMinistriesCOJIM?mibextid=ZbWKwL&_rdc=1&_rdr"
              className="socio-fb"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/cojimofficiel?t=gM2yvX_4GzUAgcdXD-rP8g&s=09"
              className="socio-tw"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              target="_blank"
              href="https://www.tiktok.com/@cojim?_t=8Z9fouq804D&_r=1"
              className="socio-tik"
              rel="noreferrer"
            >
              <FaTiktok />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/cojimofficiel/?igshid=YmMyMTA2M2Y%3D"
              className="socio-in"
              rel="noreferrer"
            >
              <AiFillInstagram />
            </a>
          </div>
        </div>
        <div className="logif-text">
          <h2>
            Lovers of God International Foundation-LOGIF <br /> (Non
            Governmental Org)
          </h2>
          <h3>Aims and Objectives</h3>
          <ul>
            <li>To help bring lovers of God together.</li>
            <li>Improve the welfare of members</li>
            <li>Empower the less privileged in the society</li>
            <li>Provide social amenities to the community</li>
            <li>
              Preach the Gospel of our Lord and Saviour Jesus Christ both
              locally and internationally.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
