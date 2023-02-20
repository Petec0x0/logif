import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import './donate.css';

const Donate = () => {
  return (
    <>
      <Navbar />
      <div className="ab-sub">
        <h2>Donate</h2>
      </div>
      <div className="don-body">
        <h2>Donate & Help</h2>
        <p>
          Donating to Rotary means clean water and sanitation. Health and hope
          in areas that were once ravaged by diseases. Economic development and
          new opportunities. Your financial help makes all this happen and more.
        </p>
        <Link className="don-btn" to="/give">
          We Appreciate
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
