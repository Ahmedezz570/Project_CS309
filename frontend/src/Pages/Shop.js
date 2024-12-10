import React from 'react'
import './CSS/Shop.css';
import Navbar from '../Components/NavBar/Navbar';
import brand from '../Components/Assets/1.png'
const Shop = () => {
  return (
    <div>
      <div className="nav-sec">
        <Navbar />
      </div>
      <div className="container">
        <section className='Best-sell'>
          <h2> best selling</h2>
          <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Soluta nemo natus minus velit repellat? Minus natus tenetur exercitationem sed consequuntur ipsa quaerat!</p>

            <div className="card">
              <img src={brand} alt="" />

            </div>
        </section>
      </div>
    </div>


  );
}

export default Shop;