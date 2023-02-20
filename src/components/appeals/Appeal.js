import React from 'react';
import { Link } from 'react-router-dom';
import './appeal.css';
import img from '../../img/less.jpg';
import img2 from '../../img/orphan.jpg';
import img3 from '../../img/world.jpg';

const Appeal = () => {
  return (
    <>
      <div className="app-body">
        <div className="app-head">
          <h2>We Can Change The World</h2>
          <h1>Appeals & Donations</h1>
        </div>

        <div className="app-items">
          <div className="app-self">
            <img src={img3} alt="" />
            <h3>Contribute to the world</h3>
            <Link className="app-btn" to="/donate">
              Donate Now
            </Link>
          </div>
          <div className="app-self">
            <img src={img} alt="" />
            <h3>Contribute for the poor</h3>
            <Link className="app-btn" to="/donate">
              Donate Now
            </Link>
          </div>
          <div className="app-self">
            <img src={img2} alt="" />
            <h3>Contribute for the orphans</h3>
            <Link className="app-btn" to="/donate">
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appeal;
