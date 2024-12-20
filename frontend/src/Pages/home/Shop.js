import React from 'react'
import '../CSS/Shop.css';
import Navbar from '../../Components/NavBar/Navbar';
import Sell from './Sell'
import '../Tranning'
import Logos from './Logos'
import ImageSec from './ImageSec';
import Final from './Final';
import SpecialSec from './SpecialSec';
import Footer from '../../Components/Footer/Footer';
const Shop = () => {

  // const date = new Date()
  // prompt(date.toLocaleTimeString())
  return (
    <div>
        <div className='abs-div'>
      <div className="nav-sec">
        <Navbar />
        </div>
      </div>
      <div className="container">
        <Logos />
        <Sell />
      </div>
      <ImageSec />
      <SpecialSec/>
      <Final />
      <Footer />
    </div>


  );
}

export default Shop;