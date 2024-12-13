import React from 'react'
import '../CSS/Shop.css';
import Navbar from '../../Components/NavBar/Navbar';
import Sell from './Sell'
import '../Tranning'
const Shop = () => {
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
      
        <Sell/>
      </div>
        <section className='img-sec'>
          <div className="content">
        <p> flat 30% discount</p>
        <h2> football equipment</h2>
        <a href="../Tranning.js"> view more</a>
          </div>
        </section>
    </div>


  );
}

export default Shop;