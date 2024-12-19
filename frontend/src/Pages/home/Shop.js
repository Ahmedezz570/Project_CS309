import React from 'react'
import '../CSS/Shop.css';
import Navbar from '../../Components/NavBar/Navbar';
import Sell from './Sell'
import '../Tranning'
import shoe from '../../Components/Assets/—Pngtree—casual shoes_5640199.png'
import brand from '../../Components/Assets/brand-36-1.png'
import brand1 from '../../Components/Assets/brand-36-2.png'
import brand2 from '../../Components/Assets/brand-36-3.png'
import brand3 from '../../Components/Assets/brand-36-4.png'
import brand4 from '../../Components/Assets/brand-36-5.png'
import brand5 from '../../Components/Assets/brand-36-6.png'
import brand6 from '../../Components/Assets/brand-36-7.png'
import Footer from '../../Components/Footer/Footer';
const Shop = () => {

  // const date = new Date()
  // prompt(date.toLocaleTimeString())
  return (
    <div>
      <div className="nav-sec">
        <Navbar />
      </div>
      <div className="container">
        <section className='logos'>
          <div className='logo'>
            <i className="fa-regular fa-paper-plane"></i>
            <div>
              <h3>Free Worlwide Shipping</h3>
              <p> Lorem Ipsum Is Simply Dummy Text
                Lorem Ipsum Lorem ipsum dolor, sit amet  </p>
            </div>
          </div>
          <div className='logo'>
            <i className="fa-regular fa-paper-plane"></i>
            <div>
              <h3>Free Worlwide Shipping</h3>
              <p> Lorem Ipsum Is Simply Dummy Text
                Lorem Ipsum Lorem ipsum dolor, sit amet  </p>
            </div>
          </div>
          <div className='logo'>
            <i className="fa-regular fa-paper-plane"></i>
            <div>
              <h3>Free Worlwide Shipping</h3>
              <p> Lorem Ipsum Is Simply Dummy Text
                Lorem Ipsum Lorem ipsum dolor, sit amet  </p>
            </div>
          </div>

        </section>

        <Sell />
      </div>
      <section className='img-sec'>

        <div className="content">
          <p> flat 30% discount</p>
          <h2> football equipment</h2>
          <a href="../Tranning.js"> view more</a>
        </div>
      </section>
      <section className='special_pro container'>
        <div className='contain'>
          <div className='spec-text'>
            <p className='abs-p'> Deal</p>
            <h3> deal of the week </h3>
            <p style={{ margin: "8% 0", fontfamily: " cursive" }}>Hurry up! Products discounts up to 70%. </p>
            <a href="/allproduct"> + view all avaliable products </a>
          </div>
          <div className='products'>
            <div className="sm-card">
              <img src={shoe} alt=" no shoe " />
              <p className='name'> sport shoe </p>
              <p className='pricee'>$30.00</p>
              <del> $50.00</del>
            </div>
            <div className="sm-card" style={{borderLeft:"1px solid" , borderRight:"1px solid"}}>
              <img src={shoe} alt=" no shoe " />
              <p className='name'> sport shoe </p>
              <p className='pricee'>$30.00</p>
              <del> $50.00</del>
            </div>
            <div className="sm-card">
              <img src={shoe} alt=" no shoe " />
              <p className='name'> sport shoe </p>
              <p className='pricee'>$30.00</p>
              <del> $50.00</del>
            </div>
          </div>
        </div>
      </section>
      <section className='final container'>
      <img src={brand} alt="" />
      <img src={brand1} alt="" />
      <img src={brand2} alt="" />
      <img src={brand3} alt="" />
      <img src={brand4} alt="" />
      <img src={brand5} alt="" />
      <img src={brand6} alt="" />
      </section>
      <Footer/>
    </div>


  );
}

export default Shop;