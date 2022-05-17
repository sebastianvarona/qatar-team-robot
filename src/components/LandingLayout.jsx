import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function LandingLayout(props) {
  return (
    <div className="">
      <Navbar />
      <div className={``}>{props.children}</div>
      <Footer />
    </div>
  );
}
