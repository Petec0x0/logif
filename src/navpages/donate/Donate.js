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
        <h2 className="text-primary font-bold">Donate</h2>
      </div>
      <div className="don-body pt-4 pb-10">
        <h3 className="text-4xl font-bold mx-4 text-center">
          Make a Difference Today - Donate to
          <Link className="hover:underline font-bold" to="/give"> LOGIF</Link>
        </h3>
        <p className="text-justify text-lg mx-4 md:mx-20 lg:mx-48">
          At Lovers of God International Foundation (LOGIF), we are committed to improving the lives
          of individuals and communities through education, health, and economic
          empowerment programs. With your help, we can continue to make a positive impact in
          the world and create a brighter future for those in need.
        </p>

        <p className="text-justify text-lg mx-4 md:mx-20 lg:mx-48">
          Your donation will help us provide essential resources to those who need it most.
          From providing access to education and training, to offering health and wellness services,
          to supporting small business ventures, your contribution can make a real difference in the
          lives of the less privileged in our society.
        </p>

        <p className="text-justify text-lg mx-4 md:mx-20 lg:mx-48">
          Please consider donating to LOGIF today and join us in our mission to transform lives and
          build a better world. Every donation, no matter how small, can help make a difference.
        </p>
        <Link className="don-btn" to="/give">
          Donate Now
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
