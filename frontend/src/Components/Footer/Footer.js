import React from 'react';
import './Footer.css';
import cover from '../../Components/Assets/EPL Player Of The Year.jpg'
const Footer = () => {
  return (
    <footer >

      <div className='any'>
        <div className="fir_half flex">
          <h2> Striker</h2>
          <form action="" style={{ marginTop: '22px' }}>
            <p> Sign up for more info</p>
            <input type="text" name='userEmail' placeholder='Enter your name' />
            <input type="email" name='userEmail' placeholder='Enter your email' />

            <button>Submit</button>
          </form>
        </div>
      </div>
      <div className="sec-half container flex">
        <div className='find'>
          <h4> Find Your way </h4>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Products</a>
          </li>
          <li>
            <a href="">Special</a>
          </li>
          <li>
            <a href=""> Contact us</a>
          </li>
        </div>
        <div className="branch">
          <h4> Branchs</h4>
          <li> Cairo </li>
          <li> Giza </li>
          <li> Alexandria </li>
          <li> Aswan </li>
        </div>
      <img src={cover} alt="" />
      </div>
    </footer>
  )
}

export default Footer;