import React from 'react';
import { FaBook, FaDollarSign, FaMale, FaThumbsUp } from 'react-icons/fa';
import './point.css';

const Points = () => {
  return (
    <>
      <div className="po-body">
        <div className="po-cont">
          <div className="po-self">
            <FaDollarSign className="po-icon" />
            <h1 style={{ color: '#34a3d5' }}>$2.4K</h1>
            <p>
              Received Donations from <br /> our Loving People
            </p>
          </div>
          <div className="po-self">
            <FaThumbsUp className="po-icon" />
            <h1 style={{ color: '#e5ac1b' }}>100K</h1>
            <p>
              Different Projects Done With <br /> The Help Of Donators
            </p>
          </div>
          <div className="po-self">
            <FaBook className="po-icon" />
            <h1 style={{ color: '#46b3a3' }}>13K</h1>
            <p>
              With Our Volunteers We've <br /> Solved Many Causes
            </p>
          </div>
          <div className="po-self">
            <FaMale className="po-icon" />
            <h1 style={{ color: '#922ece' }}>90P</h1>
            <p>
              A Team Consisting Of The Best <br /> Volunteers
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Points;
