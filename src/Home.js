import React from 'react';
import Appeal from './components/appeals/Appeal';
import Footer from './components/footer/Footer';
import Hero from './components/heropage/Hero';
import Navbar from './components/navbar/Navbar';
import Points from './components/points/Points';
import Project from './components/projects/Project';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Appeal />
      <Points />
      <Project />
      <Footer />
    </>
  );
};

export default Home;
