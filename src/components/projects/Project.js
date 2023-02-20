import React from 'react';
import { FaGlobe, FaHome, FaPlus } from 'react-icons/fa';
import './project.css';

const Project = () => {
  return (
    <>
      <div className="pro-body">
        <div className="app-head">
          <h2>We Can Change The World</h2>
          <h1>Ongoing Projects</h1>
        </div>
        <div className="pro-cont">
          <div className="pro-self">
            <FaPlus className="pro-icon" />
            <h4>EMERGENCY AIDS</h4>
          </div>
          <div className="pro-self">
            <FaGlobe className="pro-icon" />
            <h4>ZERO POVERTY</h4>
          </div>
          <div className="pro-self">
            <FaHome className="pro-icon" />
            <h4>ORPHAN SUPPORT</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
